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


export default {
  createParticipant,
  getParticipants,
};
