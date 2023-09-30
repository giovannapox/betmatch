import { Request, Response } from "express";

async function createBet(req: Request, res: Response) {
    try {
        const { homeTeamName, awayTeamName } = req.body;
        res.status(201).json();
      } catch (error) {
        res.sendStatus(500);
      }
}

export default {
    createBet,
}