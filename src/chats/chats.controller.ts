import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';

import { CreateChatDto } from './dto/create-chat.dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':user_id')
  findAllByUserId(@Param('user_id') user_id: number) {
    return this.chatsService.findAllByUserId(user_id);
  }
}
