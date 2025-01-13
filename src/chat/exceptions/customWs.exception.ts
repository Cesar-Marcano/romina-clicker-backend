import { WsException } from '@nestjs/websockets';
import { WsExceptionOptions } from '../interfaces/customWsException.interface';

export class CustomWsException extends WsException {
  close: boolean;
  reconnect: boolean;
  description: string | object;

  constructor(message: string, options: WsExceptionOptions) {
    super(message);
    this.close = options.close;
    this.reconnect = options.reconnect;
    this.description = options.description;
  }
}
