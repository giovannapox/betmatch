import { prisma } from "../configs/database";

async function createBet (homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    return await prisma.bet.create({
      data: {
        homeTeamScore,
	    awayTeamScore,
	    amountBet,
	    gameId,
	    participantId,
        status: 'PENDING' 
      },
    });
};

export default {
    createBet,
};
  