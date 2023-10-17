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

  @Get(':id')
  findAllByUser(@Param('id') id: number) {
    return this.chatsService.findAllByUser(id);
  }
}
