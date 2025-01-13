import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsExceptionFilter } from './chat.filter';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { ChatService } from './chat.service';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    await this.chatService.addUserToChat(
      client.id,
      client.handshake.headers.authorization,
    );

    client.broadcast.emit('new:user', {
      user: this.chatService.getChatUser(client.id),
      timestamp: Date.now(),
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('user:disconnected', {
      user: this.chatService.getChatUser(client.id),
      timestamp: Date.now(),
    });

    this.chatService.removeUserFromChat(client.id);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessageDto,
  ) {
    const newMessage = this.chatService.createMessage(client.id, payload);

    client.broadcast.emit('message', newMessage);
  }
}
