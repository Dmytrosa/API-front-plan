import { Request, Response } from 'express';
import { PlayerRepository } from '../../infrastructure/repositories/PlayerRepository';
import { Player } from '../../domain/entities/Player';

export class PlayerController {
  private playerRepo: PlayerRepository;

  constructor() {
    this.playerRepo = new PlayerRepository();
  }

  async createPlayer(req: Request, res: Response): Promise<void> {
    const { username } = req.body;
    const player = new Player(username);
    const createdPlayer = await this.playerRepo.create(player);
    res.status(201).json(createdPlayer);
  }

  async getPlayer(req: Request, res: Response): Promise<void> {
    const { playerId } = req.params;
    const player = await this.playerRepo.findById(playerId);
    if (!player) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    res.status(200).json(player);
  }
}
