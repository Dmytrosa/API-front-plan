import { Choice } from "../../shared/types/general.types";
import { Player } from "./Player";

export class Game {
  public id?: string;

  constructor(
    public player1: Player,
    public player2: Player,
    public score: { [playerId: string]: number } = {},
    public isActive: boolean = true,
    public choices: { [playerId: string]: Choice | null } = {}
  ) {}
}
