import { Request, Response } from "express";
import betService from '../services/bets.service';

async function createBet(req: Request, res: Response) {
    try {
        const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body;
        const bet = await betService.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
        res.status(201).json(bet);
      } catch (error) {
        res.sendStatus(500);
      }
}

export default {
    createBet,
}