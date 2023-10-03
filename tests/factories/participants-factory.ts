import { prisma } from "@/configs";
import { faker } from "@faker-js/faker";

export function createParticipant(){
    return prisma.participant.create({
        data: {
            name: faker.person.fullName(),
            balance: 1000
        }
    })
}