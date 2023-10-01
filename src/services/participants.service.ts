import participantsRepository from '../repositories/participants.repository';

async function createParticipant(name: string, balance: number) {
  if (balance < 1000) {
    throw new Error('O saldo inicial deve ser pelo menos R$ 10,00 (1000 centavos).');
  }

  return await participantsRepository.createParticipant(name, balance);
}

async function getParticipants() {
  return participantsRepository.getParticipants();
}

async function getParticipantById(participantId: number) {
  return await participantsRepository.getParticipantById(participantId);
}

async function deductBalance(participantId: number, amountBet: number) {
  const participant = await participantsRepository.getParticipantById(participantId);
  if (!participant ) throw new Error('O participante não existe');
  
  const updatedBalance = participant.balance - amountBet;

  await participantsRepository.updateParticipantBalance(participantId, updatedBalance);

  return updatedBalance;
}

export default {
  createParticipant,
  getParticipants,
  getParticipantById,
  deductBalance
};
