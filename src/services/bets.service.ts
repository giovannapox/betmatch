import gamesRepository from '../repositories/games.repository';
import betRepository from '../repositories/bets.repository';
import participantsService from './participants.service';

async function createBet (homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    const participant = await participantsService.getParticipantById(participantId);
    if (!participant ) throw new Error('O participante não existe');
    if (participant.balance < amountBet) throw new Error('Saldo insuficiente para criar a aposta.');

    const gameFinished = await isGameFinished(gameId);
    if (gameFinished) throw new Error('Não é possível criar uma aposta em um jogo que já finalizou.');

    await participantsService.deductBalance(participantId, amountBet);

    return await betRepository.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
}

async function isGameFinished(gameId: number) {
    const game = await gamesRepository.getGameById(gameId);
    return game ? game.isFinished : false;
}
  

export default {
    createBet
};