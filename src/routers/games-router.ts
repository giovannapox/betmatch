import { Router } from "express";
import gamesController from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter
    .post("/games", gamesController.createGame)
    .post("/games/:id/finish", gamesController.finishGame)
    .get("/games", gamesController.findGames)
    .get("/games/:id", gamesController.findGameById)


export { gamesRouter };    
