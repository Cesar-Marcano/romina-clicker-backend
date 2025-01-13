import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ChatUser } from './interfaces/chatUser.interface';
import { CustomWsException } from './exceptions/customWs.exception';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private authService: AuthService) {}

  private readonly chatUsers: Map<string, ChatUser> = new Map<
    string,
    ChatUser
  >();

  async addUserToChat(clientId: string, token: string) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new CustomWsException('Unauthorized', {
        close: true,
        description: 'No token provided.',
      });
    }

    token = token.split('Bearer ')[1];

    try {
      const user = await this.authService.verifyToken(token);
      this.chatUsers.set(clientId, {
        userId: user.sub,
        username: user.username,
      });
    } catch (error) {
      const message =
        error.name === 'TokenExpiredError'
          ? 'Token has expired.'
          : 'Invalid token.';
      throw new CustomWsException('Unauthorized', {
        close: true,
        description: message,
      });
    }
  }

  async removeUserFromChat(clientId: string) {
    this.chatUsers.delete(clientId);
  }

  getChatUser(clientId: string) {
    const user = this.chatUsers.get(clientId);

    if (!user) {
      throw new CustomWsException('Internal server error', {
        reconnect: true,
        close: true,
        description:
          'The user is not registered in the Chat Users Collection. Try to reconnect.',
      });
    }

    return user;
  }

  createMessage(clientId: string, data: MessageDto) {
    const user = this.getChatUser(clientId);

    return {
      content: data.content,
      sender: user,
      timestamp: Date.now(),
    };
  }
}
