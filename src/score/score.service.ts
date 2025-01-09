import { Injectable } from '@nestjs/common';
import { Score, ScoreDocument } from './schemas/score.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<ScoreDocument>,
  ) {}

  async addScore(
    userId: string,
    game: string,
    score: number,
  ): Promise<ScoreDocument> {
    return this.scoreModel.create({ user: userId, game, score });
  }

  async getScores(userId: string, game: string): Promise<ScoreDocument[]> {
    return this.scoreModel
      .find({ user: userId, game })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getTopScores(
    game: string,
    page: number,
    limit: number,
    userId?: string,
  ): Promise<ScoreDocument[]> {
    const filter: any = { game };
    if (userId) {
      filter.user = userId;
    }

    const validatedPage = Math.max(page, 1);
    const validatedLimit = Math.max(limit, 1);
    
    return await this.scoreModel
      .find(filter)
      .sort({ score: -1 })
      .skip((validatedPage - 1) * validatedLimit)
      .limit(validatedLimit)
      .exec();
  }

  async getScoreById(scoreId: string): Promise<ScoreDocument> {
    return this.scoreModel.findById(scoreId).exec();
  }
}
