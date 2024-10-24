import { Router } from "express";
import { PlayerController } from "../controllers/PlayerController";

const router = Router();
const playerController = new PlayerController();

router.post("/", (req, res) => playerController.createPlayer(req, res));
router.get("/:playerId", (req, res) => playerController.getPlayer(req, res));

export default router;
