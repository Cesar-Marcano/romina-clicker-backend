import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { CustomWsException } from './exceptions/customWs.exception';
import { Socket } from 'socket.io';

@Catch(CustomWsException, WsException, BadRequestException)
export class WsExceptionFilter
  extends BaseWsExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: CustomWsException | WsException | BadRequestException,
    host: ArgumentsHost,
  ) {
    const client: Socket = host.switchToWs().getClient();

    let description: string | object | undefined;

    if (exception instanceof BadRequestException) {
      description = exception.getResponse();
    } else if (exception instanceof CustomWsException) {
      description = exception.description;
    }

    client.emit('error', {
      status: 'error',
      message: exception.message,
      timestamp: new Date().toISOString(),
      description,
    });

    if (exception instanceof CustomWsException && exception.reconnect) {
      client.emit('reconnect', true);
    }
    if (exception instanceof CustomWsException && exception.close) {
      client.disconnect();
    }
  }
}
