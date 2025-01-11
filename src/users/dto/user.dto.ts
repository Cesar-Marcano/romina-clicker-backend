import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password?: string;
}
