import mongoose, { Schema, Document } from "mongoose";
import { Status, StatusEnum } from "../../shared/types/general.types";
import { PLAYER } from "../../shared/constants/general";

export interface PlayerDocument extends Document {
  username: string;
  status: Status;
}

const PlayerSchema: Schema = new Schema({
  username: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.OUT_OF_GAME,
  },
});

export default mongoose.model<PlayerDocument>(PLAYER, PlayerSchema);
