import { Router } from "express";
import gamesController from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter
    .post("/games", gamesController.createGame)
    .post("/games/:id/finish", )
    .get("/games", gamesController.findGames)
    .get("/games/:id", )


export { gamesRouter };    
