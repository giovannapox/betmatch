import { Request, Response } from "express";
import betService from '../services/bets.service';
import httpStatus from "http-status";

async function createBet(req: Request, res: Response) {
    try {
        const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body;
        const bet = await betService.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
        res.status(201).json(bet);
      } catch (error) {
        if (error.name === "NotFoundError") {
          return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "InsufficientBalanceError") {
          return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
        if (error.name === "ConflictError") {
          return res.status(httpStatus.CONFLICT).send(error.message);
        }
        res.sendStatus(500);
      }
}

export default {
    createBet,
}