import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findAllByUser(@Param('id') id: number) {
    return this.chatsService.findAllByUser(id);
  }
}
