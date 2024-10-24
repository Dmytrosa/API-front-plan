import express from "express";
import dotenv from "dotenv";
import playerRoutes from "./interfaces/routes/playerRoutes";
import gameRoutes from "./interfaces/routes/gameRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/players", playerRoutes);
app.use("/games", gameRoutes);

export default app;
