import { Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get(':user_id')
  findAllByUserId(@Param('user_id') user_id: number) {
    return this.chatsService.findAllByUserId(user_id);
  }
}
