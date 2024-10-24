import { IGameRepository } from "../../domain/repositories/IGameRepository";
import { Game } from "../../domain/entities/Game";
import GameModel, { GameDocument } from "../db/GameModel";
import { Player } from "../../domain/entities/Player";
import { PlayerDocument } from "../db/PlayerModel";
import { PLAYER1, PLAYER2 } from "../../shared/constants/general";

export class GameRepository implements IGameRepository {
  async create(game: Game): Promise<Game> {
    const gameData = {
      player1: game.player1.id,
      player2: game.player2.id,
      score: game.score,
      isActive: game.isActive,
      choices: game.choices,
    };
    const gameDoc = new GameModel(gameData);
    const savedGame = await gameDoc.save();
    const newGame = new Game(
      game.player1,
      game.player2,
      savedGame.score,
      savedGame.isActive,
      savedGame.choices
    );
    newGame.id = savedGame.id;
    return newGame;
  }

  async findById(id: string): Promise<Game | null> {
    const gameDoc = await GameModel.findById(id)
      .populate(PLAYER1)
      .populate(PLAYER2)
      .exec();

    if (!gameDoc) return null;

    const gameDocPopulated = gameDoc as GameDocument & {
      player1: PlayerDocument;
      player2: PlayerDocument;
    };

    const player1Doc = gameDocPopulated.player1;
    const player2Doc = gameDocPopulated.player2;

    const player1 = new Player(player1Doc.username, player1Doc.status);
    player1.id = player1Doc.id;

    const player2 = new Player(player2Doc.username, player2Doc.status);
    player2.id = player2Doc.id;

    const game = new Game(
      player1,
      player2,
      gameDocPopulated.score,
      gameDocPopulated.isActive,
      gameDocPopulated.choices
    );
    game.id = gameDocPopulated.id;

    return game;
  }

  async update(game: Game): Promise<void> {
    const gameData = {
      player1: game.player1.id,
      player2: game.player2.id,
      score: game.score,
      isActive: game.isActive,
      choices: game.choices,
    };
    await GameModel.findByIdAndUpdate(game.id, gameData, { new: true });
  }
}
