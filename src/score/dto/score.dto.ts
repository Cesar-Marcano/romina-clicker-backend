import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsInt,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class AddScoreDto {
  @IsString()
  @IsNotEmpty()
  readonly game: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  readonly score: number;
}
