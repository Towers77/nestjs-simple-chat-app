import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);

    if (user) throw new BadRequestException('User already exists');

    return await this.usersService.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user)
      throw new UnauthorizedException(
        'Provided email does not match with any account',
      );

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Wrong password');

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
      },
      { secret: process.env.JWT_SECRET },
    );

    return { token, id: user.id };
  }
}
