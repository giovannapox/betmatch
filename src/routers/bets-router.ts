import { Router } from "express";
import betsController from "../controllers/bets.controller";

const betsRouter = Router();

betsRouter
    .post("/bets", betsController.createBet)

export { betsRouter };    