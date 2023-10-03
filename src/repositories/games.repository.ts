import { prisma } from "../configs/database";

async function createGame (homeTeamName: string, awayTeamName: string){
    return await prisma.game.create({
        data: {
          homeTeamName,
          awayTeamName,
        },
      });
}

async function finishGame (gameId: number, homeTeamScore: number, awayTeamScore: number){
    const game = prisma.game.update({
      where: {
        id: gameId
      },
      data: {
        homeTeamScore,
        awayTeamScore,
        isFinished: true,
      },
      include: {
        bets: true
      }
    })

    if(!game) return null
    return game;
}

async function findGames (){
    return prisma.game.findMany();
}


async function getGameById(gameId: number) {
  return await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      bets: true
    },
  });
}

export default {
    createGame,
    finishGame,
    findGames,
    getGameById
};