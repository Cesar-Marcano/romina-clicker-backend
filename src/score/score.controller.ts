import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddScoreDto } from './dto/score.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  addScore(@Request() req, @Body() body: AddScoreDto) {
    return this.scoreService.addScore(req.user.sub, body.game, body.score);
  }

  @UseGuards(AuthGuard)
  @Get('current-user/:game')
  getUserScores(@Request() req, @Param('game') game: string) {
    return this.scoreService.getScores(req.user.sub, game);
  }

  @Get('global/top/:game')
  getTopScores(
    @Param('game') game: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1,
  ) {
    return this.scoreService.getTopScores(
      game,
      page,
      limit,
    );
  }

  @Get(':userId/top/:game')
  getTopPlayerScores(
    @Param('game') game: string,
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1,
  ) {
    return this.scoreService.getTopScores(
      game,
      page,
      limit,
      userId,
    );
  }

  @Get(':id')
  getScore(@Param('id') id: string) {
    return this.scoreService.getScoreById(id);
  }

  @Get('/highest/:userId/:game/')
  getUserScoreRecord(@Param('game') game: string, @Param('userId') userId: string) {
    return this.scoreService.getUserMaxScoreRecord(userId, game);
  }
}
