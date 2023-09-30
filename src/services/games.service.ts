import gamesRepository from '../repositories/games.repository';

async function createGame (homeTeamName: string, awayTeamName: string) {
    return await gamesRepository.createGame(homeTeamName, awayTeamName);
}

async function getGames () {
    return await gamesRepository.findGames();
}

export default {
    createGame,
    getGames
  };
  
