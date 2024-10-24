import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { Player } from "../../domain/entities/Player";
import PlayerModel from "../db/PlayerModel";

export class PlayerRepository implements IPlayerRepository {
  async create(player: Player): Promise<Player> {
    const playerDoc = new PlayerModel({
      username: player.username,
      status: player.status,
    });
    const savedPlayer = await playerDoc.save();
    const newPlayer = new Player(savedPlayer.username, savedPlayer.status);
    newPlayer.id = savedPlayer.id;
    return newPlayer;
  }

  async findById(id: string): Promise<Player | null> {
    const playerDoc = await PlayerModel.findById(id);
    if (!playerDoc) return null;
    const player = new Player(playerDoc.username, playerDoc.status);
    player.id = playerDoc.id;
    return player;
  }

  async update(player: Player): Promise<void> {
    await PlayerModel.findByIdAndUpdate(player.id, {
      username: player.username,
      status: player.status,
    });
  }
}
