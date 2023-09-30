import { Request, Response } from "express";
import gamesService from '../services/games.service';

async function createGame(req: Request, res: Response) {
    try {
        const { homeTeamName, awayTeamName } = req.body;
    
        const game = await gamesService.createGame(homeTeamName, awayTeamName);
        res.status(201).json(game);
    
      } catch (error) {
        res.sendStatus(500);
      }
}

async function findGames(req: Request, res: Response) {
    try {
        const games = await gamesService.getGames();
        res.status(201).json(games);
    
      } catch (error) {
        res.sendStatus(500);
      }
}


export default {
    createGame,
    findGames
};  
    