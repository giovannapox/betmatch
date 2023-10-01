import { prisma } from "../configs/database"

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

async function getParticipantById(participantId: number) {
  return await prisma.participant.findUnique({
    where: { id: participantId },
  });
}

async function updateParticipantBalance(participantId: number, updatedBalance: number) {
  return await prisma.participant.update({
    where: { id: participantId },
    data: { balance: updatedBalance },
  });
}


export default {
  createParticipant,
  getParticipants,
  getParticipantById,
  updateParticipantBalance
};
