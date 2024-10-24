import { IGameRepository } from "../../domain/repositories/IGameRepository";

export class ResetGameUseCase {
  constructor(private gameRepo: IGameRepository) {}

  async execute(gameId: string): Promise<void> {
    const game = await this.gameRepo.findById(gameId);
    if (!game) throw new Error("Game not found");

    game.isActive = false;
    await this.gameRepo.update(game);
  }
}
