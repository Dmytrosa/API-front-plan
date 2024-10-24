import { IGameRepository } from "../../domain/repositories/IGameRepository";
import { GameStatusDTO } from "./dtos/Game.dto";

export class GetGameStatusUseCase {
  constructor(private gameRepo: IGameRepository) {}

  async execute(gameId: string): Promise<GameStatusDTO> {
    const game = await this.gameRepo.findById(gameId);
    if (!game) throw new Error("Game not found");

    // Construct and return a GameStatusDTO without 'choices'
    const gameStatus: GameStatusDTO = {
      id: game.id,
      player1: game.player1,
      player2: game.player2,
      score: game.score,
      isActive: game.isActive,
    };

    return gameStatus;
  }
}
