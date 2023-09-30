import { Prisma } from '@prisma/client';
import { prisma } from "../configs/database"
import { BodyParams } from '@/controllers/participants.controller';

async function createParticipant (name: string, balance: number) {
  return await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
};

async function getParticipants() {
  return prisma.participant.findMany();
}

export default {
  createParticipant,
  getParticipants,
};
