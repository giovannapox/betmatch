import gamesRepository from '../repositories/games.repository';
import betRepository from '../repositories/bets.repository';
import participantsService from './participants.service';
import { notFoundError } from '../errors/not-found-error';
import { insufficientBalanceError } from '../errors/insufficient-balance-error';
import { conflictError } from '../errors/conflict-error';

async function createBet (homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    const participant = await participantsService.getParticipantById(participantId);
    if (!participant ) throw notFoundError('Participant not found.');
    if (participant.balance < amountBet) throw insufficientBalanceError();

    const game = await gamesRepository.getGameById(gameId);
    if(!game) throw notFoundError('Game not found.')
    
    const gameFinished = await isGameFinished(gameId);
    if (gameFinished) throw conflictError('The game has already concluded.');

    await participantsService.updateBalance(participantId, amountBet);

    return await betRepository.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
}

async function isGameFinished(gameId: number) {
    const game = await gamesRepository.getGameById(gameId);
    return game ? game.isFinished : false;
}
  

export default {
    createBet
};