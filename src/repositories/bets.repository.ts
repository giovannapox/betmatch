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

async function updateBetStatus(betId: number, status: string){
  return await prisma.bet.update({
    where: {
      id: betId
    },
    data: {
      status
    }
  })
}

async function updateBetAmount (betId: number, amountWon: number){
  return await prisma.bet.update({
    where: {
      id: betId
    },
    data: {
      amountWon
    }
  })
}

export default {
    createBet,
    updateBetStatus,
    updateBetAmount
};
  