import { Game } from "../entities/Game";

export interface IGameRepository {
  create(game: Game): Promise<Game>;
  findById(id: string): Promise<Game | null>;
  update(game: Game): Promise<void>;
}
