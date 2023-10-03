import { prisma } from "@/configs";
import { faker } from "@faker-js/faker";

export function createGame(){
    return prisma.game.create({
        data: {
            homeTeamName: faker.helpers.arrayElement(['flamengo', 'palmeiras', 'santos', 'real madrid']),
	        awayTeamName: faker.helpers.arrayElement(['corinthians', 'vasco', 'fluminense', 'barcelona'])
        }
    })
}