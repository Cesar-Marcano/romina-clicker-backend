import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  AddScoreDto,
  GetTopScoresDto,
  GetUserScoresDto,
} from './dto/score.dto';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @UseGuards(AuthGuard)
  @Post('add-score')
  addScore(@Request() req, @Body() body: AddScoreDto) {
    return this.scoreService.addScore(req.user.sub, body.game, body.score);
  }

  @UseGuards(AuthGuard)
  @Get('get-user-scores')
  getUserScores(@Request() req, @Body() body: GetUserScoresDto) {
    return this.scoreService.getScores(req.user.sub, body.game);
  }

  @Get('get-top-scores')
  getTopScores(@Body() body: GetTopScoresDto) {
    return this.scoreService.getTopScores(
      body.game,
      body.page,
      body.limit,
      body.userId,
    );
  }

  @Get('get-score/:id')
  getScore(@Param('id') id: string) {
    return this.scoreService.getScoreById(id);
  }

  @Get('score-record/:game/:id')
  getUserScoreRecord(@Param('game') game: string, @Param('id') id: string) {
    return this.scoreService.getUserMaxScoreRecord(id, game);
  }
}
