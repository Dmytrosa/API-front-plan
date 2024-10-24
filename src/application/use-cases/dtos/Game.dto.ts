import { Player } from "../../../domain/entities/Player";

//Interface excluding 'choices'
export interface GameStatusDTO {
  id?: string;
  player1: Player;
  player2: Player;
  score: { [playerId: string]: number };
  isActive: boolean;
}
