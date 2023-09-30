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

export default {
    createGame,
    finishGame,
    findGames,
    findGameById
};