import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: [process.env.URL], credentials: true } })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  //@UseGuards(AccessTokenGuard)
  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(createMessageDto);

    this.server
      .in(createMessageDto.sent_in.toString())
      .emit('createMessage', message);
  }

  @SubscribeMessage('joinChat')
  async joinChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId.toString());
  }

  //@UseGuards(AccessTokenGuard)
  @SubscribeMessage('findMessagesFromOneChat')
  async findFromOneChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit(
      'findMessagesFromOneChat',
      await this.messagesService.findAllFromChat(chatId),
    );
  }
}
