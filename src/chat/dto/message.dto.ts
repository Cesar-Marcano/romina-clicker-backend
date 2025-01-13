import { IsNotEmpty, IsString, Length } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  content: string;
}
