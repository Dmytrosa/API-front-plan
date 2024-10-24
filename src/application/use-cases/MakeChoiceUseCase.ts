import { IGameRepository } from "../../domain/repositories/IGameRepository";
import { Choice, ChoiceEnum } from "../../shared/types/general.types";

export class MakeChoiceUseCase {
  constructor(private gameRepo: IGameRepository) {}

  private determineWinner(choice1: Choice, choice2: Choice): number {
    if (choice1 === choice2) return 0;
    if (
      (choice1 === ChoiceEnum.ROCK && choice2 === ChoiceEnum.SCISSORS) ||
      (choice1 === ChoiceEnum.PAPER && choice2 === ChoiceEnum.ROCK) ||
      (choice1 === ChoiceEnum.SCISSORS && choice2 === ChoiceEnum.PAPER)
    )
      return 1;
    return 2;
  }

  async execute(
    gameId: string,
    playerId: string,
    choice: Choice
  ): Promise<void> {
    const game = await this.gameRepo.findById(gameId);
    if (!game) throw new Error("Game not found");

    const isPlayerInGame =
      game.player1.id === playerId || game.player2.id === playerId;
    if (!isPlayerInGame) throw new Error("Player not in game");

    // Update player's choice in the game
    game.choices[playerId] = choice;

    // Check if both players have made their choices
    const player1Choice = game.choices[game.player1.id!];
    const player2Choice = game.choices[game.player2.id!];

    if (player1Choice && player2Choice) {
      const winner = this.determineWinner(player1Choice, player2Choice);

      if (winner === 1) {
        game.score[game.player1.id!] += 1;
      } else if (winner === 2) {
        game.score[game.player2.id!] += 1;
      }

      // Reset choices for the next round
      game.choices[game.player1.id!] = null;
      game.choices[game.player2.id!] = null;
    }

    // Update the game document, including the choices and score
    await this.gameRepo.update(game);
  }
}
