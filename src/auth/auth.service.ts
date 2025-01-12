import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';

export interface UserPayload {
  username: string,
  sub: mongoose.Types.ObjectId;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    const payload: UserPayload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(username: string, password: string) {
    try {
      const user = await this.usersService.create({ username, password });
      const payload: UserPayload = { username: user.username, sub: user._id };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Username already exists');
      }
    }
  }

  async verifyToken(token: string): Promise<UserPayload> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    return payload as UserPayload;
  }
}
