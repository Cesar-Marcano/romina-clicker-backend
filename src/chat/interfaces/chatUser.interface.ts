import mongoose from 'mongoose';

export interface ChatUser {
  userId: mongoose.Types.ObjectId;
  username: string;
}
