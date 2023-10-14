import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const user1 = await this.userRepository.findOneBy({
      id: createChatDto.user1_id,
    });
    const user2 = await this.userRepository.findOneBy({
      id: createChatDto.user2_id,
    });

    await this.chatRepository.save({ user1, user2 });

    return { message: 'Chat created Succesfully' };
  }

  async findAllByUser(id: number) {
    const user = await this.userRepository.findBy({ id });

    return await this.chatRepository.find({
      where: [{ user1: user }, { user2: user, message_count: MoreThan(0) }],
    });
  }
}
