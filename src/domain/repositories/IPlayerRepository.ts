import { Player } from "../entities/Player";

export interface IPlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: string): Promise<Player | null>;
  update(player: Player): Promise<void>;
}
