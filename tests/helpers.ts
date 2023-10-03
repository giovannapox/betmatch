import { prisma } from "@/configs";

export async function cleanDb() {
    await prisma.bet.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.participant.deleteMany({});
};
