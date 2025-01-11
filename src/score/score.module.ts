import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from './schemas/score.schema';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Score', schema: ScoreSchema }]),
    AuthModule,
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
