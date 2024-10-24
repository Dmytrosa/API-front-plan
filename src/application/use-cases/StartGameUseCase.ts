import { IGameRepository } from "../../domain/repositories/IGameRepository";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";
import { Game } from "../../domain/entities/Game";
import { StatusEnum } from "../../shared/types/general.types";

export class StartGameUseCase {
  constructor(
    private gameRepo: IGameRepository,
    private playerRepo: IPlayerRepository
  ) {}

  async execute(player1Id: string, player2Id: string): Promise<Game> {
    const player1 = await this.playerRepo.findById(player1Id);
    const player2 = await this.playerRepo.findById(player2Id);

    if (!player1 || !player2) throw new Error("Player not found");

    player1.status = StatusEnum.IN_GAME;
    player2.status = StatusEnum.IN_GAME;

    await this.playerRepo.update(player1);
    await this.playerRepo.update(player2);

    const game = new Game(player1, player2, {
      [player1.id!]: 0,
      [player2.id!]: 0,
    });

    const createdGame = await this.gameRepo.create(game);
    return createdGame;
  }
}
