import { prisma } from "@/configs";
import { faker } from "@faker-js/faker";

export function createBet(gameId: number, participantId: number){
    return prisma.bet.create({
        data: {
            homeTeamScore: faker.number.int({min: 0, max: 10}),
	        awayTeamScore: faker.number.int({min: 0, max: 10}),
	        amountBet: faker.number.int({min: 0, max: 10000}),
	        gameId, 
	        participantId,
            status: 'PENDING' 
        }
    })
};

export function createBet2(gameId: number, participantId: number, amountBet: number, homeTeamScore: number, awayTeamScore: number){
    return prisma.bet.create({
        data: {
            homeTeamScore,
	        awayTeamScore,
	        amountBet,
	        gameId, 
	        participantId,
            status: 'PENDING' 
        }
    })
};