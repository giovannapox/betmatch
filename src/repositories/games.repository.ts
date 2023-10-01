import { prisma } from "../configs/database";

async function createGame (homeTeamName: string, awayTeamName: string){
    return await prisma.game.create({
        data: {
          homeTeamName,
          awayTeamName,
        },
      });
}

async function finishGame (){
    
}

async function findGames (){
    return prisma.game.findMany();
}

async function findGameById (){
    
}

async function getGameById(gameId: number) {
  return await prisma.game.findUnique({
    where: { id: gameId },
  });
}

export default {
    createGame,
    finishGame,
    findGames,
    findGameById,
    getGameById
};