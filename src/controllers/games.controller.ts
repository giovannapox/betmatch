import { Request, Response } from "express";
import gamesService from '../services/games.service';
import httpStatus from "http-status";

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
        res.status(200).json(games);
    
      } catch (error) {
        res.sendStatus(500);
      }
}

async function findGameById(req: Request, res: Response) {
  const { id } = req.params;
  try {
      const game = await gamesService.getGamesById(Number(id));
      res.status(200).json(game);
  
    } catch (error) {
      if (error.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      res.sendStatus(500);
    }
}

async function finishGame(req: Request, res: Response) {
  const { id } = req.params;
  const { homeTeamScore, awayTeamScore } = req.body;

  try {
      const game = await gamesService.finishGame(Number(id), homeTeamScore, awayTeamScore);
      res.status(201).json(game);
  
    } catch (error) {
      if (error.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      if (error.name === "ConflictError") {
        return res.status(httpStatus.CONFLICT).send(error.message);
      }
      res.sendStatus(500);
    }
}



export default {
    createGame,
    findGames,
    findGameById,
    finishGame
};  
    