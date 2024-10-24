import { Request, Response } from 'express';
import { StartGameUseCase } from '../../application/use-cases/StartGameUseCase';
import { MakeChoiceUseCase } from '../../application/use-cases/MakeChoiceUseCase';
import { GetGameStatusUseCase } from '../../application/use-cases/GetGameStatusUseCase';
import { ResetGameUseCase } from '../../application/use-cases/ResetGameUseCase';
import { GameRepository } from '../../infrastructure/repositories/GameRepository';
import { PlayerRepository } from '../../infrastructure/repositories/PlayerRepository';
import { GameStatusDTO } from '../../application/use-cases/dtos/Game.dto';

export class GameController {
  private startGameUseCase: StartGameUseCase;
  private makeChoiceUseCase: MakeChoiceUseCase;
  private getGameStatusUseCase: GetGameStatusUseCase;
  private resetGameUseCase: ResetGameUseCase;

  constructor() {
    const gameRepo = new GameRepository();
    const playerRepo = new PlayerRepository();

    this.startGameUseCase = new StartGameUseCase(gameRepo, playerRepo);
    this.makeChoiceUseCase = new MakeChoiceUseCase(gameRepo);
    this.getGameStatusUseCase = new GetGameStatusUseCase(gameRepo);
    this.resetGameUseCase = new ResetGameUseCase(gameRepo);
  }

  async startGame(req: Request, res: Response): Promise<void> {
    const { player1Id, player2Id } = req.body;
    const game = await this.startGameUseCase.execute(player1Id, player2Id);
    res.status(201).json(game);
  }

  async makeChoice(req: Request, res: Response): Promise<void> {
    const { gameId, playerId, choice } = req.body;
    await this.makeChoiceUseCase.execute(gameId, playerId, choice);
    res.status(200).json({ message: 'Choice made' });
  }

  async getGameStatus(req: Request, res: Response): Promise<void> {
    const { gameId } = req.params;
    const gameStatus: GameStatusDTO = await this.getGameStatusUseCase.execute(gameId);
    res.status(200).json(gameStatus);
  }

  async resetGame(req: Request, res: Response): Promise<void> {
    const { gameId } = req.body;
    await this.resetGameUseCase.execute(gameId);
    res.status(200).json({ message: 'Game reset' });
  }
}
