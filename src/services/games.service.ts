import betsRepository from '../repositories/bets.repository';
import { notFoundError } from '../errors/not-found-error';
import gamesRepository from '../repositories/games.repository';
import { Bet, Game } from '@prisma/client';
import participantsService from './participants.service';
import { conflictError } from '../errors/conflict-error';

async function createGame (homeTeamName: string, awayTeamName: string) {
    return await gamesRepository.createGame(homeTeamName, awayTeamName);
}

async function getGames () {
    return await gamesRepository.findGames();
}

async function getGamesById (id: number) {
    const game = await gamesRepository.getGameById(id);
    if(!game) throw notFoundError('Game not found.')

    return game;
}

async function finishGame (gameId: number, homeTeamScore: number, awayTeamScore: number){
    const findGame = await gamesRepository.getGameById(gameId);
    if (!findGame) throw notFoundError('Game not found');

    if(findGame.isFinished === true) throw conflictError('Game already finished.');
    
    const game = await gamesRepository.finishGame(gameId, homeTeamScore, awayTeamScore);
    const allBets = game.bets;
  
    const betsPending = game.bets.filter((b) => {
        return b.status === 'PENDING';
    });
    const amountWon =  wonAmount(allBets, gameId, game)
    const amountBet = betAmount(allBets, gameId) 
    
    const game2 = await Promise.all(betsPending.map(async (bet) => {
        if (bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore) {
            const totalAmount =  Math.floor(( bet.amountBet / amountWon ) * amountBet * (1 - 0.3));
            await betsRepository.updateBetStatus(bet.id, 'WON');
            await betsRepository.updateBetAmount(bet.id, totalAmount);
            await participantsService.updateWonBalance(bet.participantId, amountWon);
            return {
                ...bet, 
                status: 'WON',
                amountWon: totalAmount
            }
        } else {
            await betsRepository.updateBetStatus(bet.id, 'LOST');
            await betsRepository.updateBetAmount(bet.id, 0)
            return {
                ...bet, 
                status: 'LOST',
                amountWon: 0
            }
        }
    }))
    
    return game2;
}

function wonAmount(allBets: Bet[], gameId: number, game: Game): number {
    const bets = allBets.filter((bet) => bet.gameId === gameId && bet.awayTeamScore === game.awayTeamScore && bet.homeTeamScore === game.homeTeamScore);
    const totalWonAmount = bets.reduce((total, bet) => total += bet.amountBet, 0);
  
    return totalWonAmount;
}

function betAmount(gameBets: Bet[], gameId: number): number {
    const gameBetsFiltered = gameBets.filter((bet) => bet.gameId === gameId);

    const totalBetAmount = gameBetsFiltered.reduce((total, bet) => total += bet.amountBet, 0);
  
    return totalBetAmount;
  }

export default {
    createGame,
    getGames,
    getGamesById,
    finishGame
};
  
