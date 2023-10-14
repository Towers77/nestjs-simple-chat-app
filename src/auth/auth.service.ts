import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) throw new BadRequestException('User already exists');

    await this.usersService.create({
      username,
      email,
      password: await hash(password, 10),
    });

    return { message: 'User registered succesfully' };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user)
      throw new UnauthorizedException(
        'Provided email does not match with any account',
      );

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Wrong password');

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
