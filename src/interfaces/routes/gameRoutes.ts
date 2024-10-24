import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router();
const gameController = new GameController();

router.post("/start", (req, res) => gameController.startGame(req, res));
router.post("/choice", (req, res) => gameController.makeChoice(req, res));
router.get("/:gameId/status", (req, res) =>
  gameController.getGameStatus(req, res)
);
router.post("/reset", (req, res) => gameController.resetGame(req, res));

export default router;
