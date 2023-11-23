import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    private readonly usersService: UsersService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const user1 = await this.usersService.findOneById(createChatDto.user1_id);
    const user2 = await this.usersService.findOneById(createChatDto.user2_id);

    const chat = await this.chatRepository.find({ where: { user1, user2 } });

    if (chat) return { message: 'Chat already exists' };

    await this.chatRepository.save({ user1, user2 });

    return { message: 'Chat created Succesfully' };
  }

  async findAllByUserId(id: number) {
    const user = await this.usersService.findOneById(id);

    return await this.chatRepository.find({
      relations: {
        user1: true,
        user2: true,
      },
      select: {
        id: true,
        user1: { id: true, username: true },
        user2: { id: true, username: true },
      },
      where: [{ user1: user }, { user2: user, message_count: MoreThan(0) }],
    });
  }
}
