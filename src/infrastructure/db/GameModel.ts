// src/infrastructure/db/GameModel.ts

import mongoose, { Schema, Document } from "mongoose";
import { PlayerDocument } from "./PlayerModel";
import { Choice } from "../../shared/types/general.types";
import { PLAYER } from "../../shared/constants/general";

export interface GameDocument extends Document {
  player1: mongoose.Types.ObjectId | PlayerDocument;
  player2: mongoose.Types.ObjectId | PlayerDocument;
  score: { [playerId: string]: number };
  isActive: boolean;
  choices: { [playerId: string]: Choice | null };
}

const GameSchema: Schema = new Schema({
  player1: { type: Schema.Types.ObjectId, ref: PLAYER, required: true },
  player2: { type: Schema.Types.ObjectId, ref: PLAYER, required: true },
  score: { type: Schema.Types.Mixed, default: {} },
  isActive: { type: Boolean, default: true },
  choices: { type: Schema.Types.Mixed, default: {} },
});

export default mongoose.model<GameDocument>("Game", GameSchema);
