import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly chatsService: ChatsService,

    private readonly usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const sent_by = await this.usersService.findOneById(
      createMessageDto.sent_by,
    );
    const sent_in = await this.chatsService.findOneById(
      createMessageDto.sent_in,
    );

    const message = await this.messageRepository.save({
      text: createMessageDto.text,
      sent_in,
      sent_by,
    });
    await this.chatsService.updateMessageCount(sent_in.id);

    const response = {
      id: message.id,
      text: message.text,
      created_at: message.created_at,
      sent_by: {
        id: sent_by.id,
        username: sent_by.username,
      },
    };
    return response;
  }

  async findAllFromChat(chatId: number) {
    const chat = await this.chatsService.findOneById(chatId);

    return await this.messageRepository.find({
      relations: { sent_by: true },
      select: {
        id: true,
        created_at: true,
        text: true,
        sent_by: { id: true, username: true },
      },
      where: { sent_in: chat },
    });
  }
}
