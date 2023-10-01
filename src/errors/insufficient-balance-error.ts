import { ApplicationError } from '@/protocols';

export function insufficientBalanceError(): ApplicationError {
  return {
    name: 'InsufficientBalanceError',
    message: 'Your balance is insufficient to place the bet.',
  };
}