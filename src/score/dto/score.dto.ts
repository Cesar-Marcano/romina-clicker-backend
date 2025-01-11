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

export class GetUserScoresDto {
  @IsString()
  @IsOptional()
  readonly game?: string;
}

export class GetTopScoresDto {
  @IsString()
  readonly game: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly page: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly limit: number;
  
  @IsMongoId()
  @IsOptional()
  readonly userId: string;
}
