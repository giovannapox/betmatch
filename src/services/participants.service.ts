import { insufficientInitialBalanceError } from '../errors/insufficient-initial-balance-error';
import { notFoundError } from '../errors/not-found-error';
import participantsRepository from '../repositories/participants.repository';

async function createParticipant(name: string, balance: number) {
  if (balance < 1000) throw insufficientInitialBalanceError();
  
  return await participantsRepository.createParticipant(name, balance);
}

async function getParticipants() {
  return participantsRepository.getParticipants();
}

async function getParticipantById(participantId: number) {
  return await participantsRepository.getParticipantById(participantId);
}

async function updateBalance(participantId: number, amountBet: number) {
  const participant = await participantsRepository.getParticipantById(participantId);
  if (!participant ) throw notFoundError('Participant not found');
  
  const updatedBalance = participant.balance - amountBet;

  await participantsRepository.updateParticipantBalance(participantId, updatedBalance);

  return updatedBalance;
}

async function updateWonBalance(participantId: number, amountWon: number) {
  const participant = await participantsRepository.getParticipantById(participantId);
  if (!participant ) throw notFoundError('Participant not found');
  
  const updatedBalance = participant.balance + amountWon;

  await participantsRepository.updateParticipantBalance(participantId, updatedBalance);

  return updatedBalance;
}

export default {
  createParticipant,
  getParticipants,
  getParticipantById,
  updateBalance,
  updateWonBalance
};
