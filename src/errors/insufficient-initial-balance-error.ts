import { ApplicationError } from '@/protocols';

export function insufficientInitialBalanceError(): ApplicationError {
  return {
    name: 'InsufficientInitialBalanceError',
    message: 'The initial balance must be at least $10.00 (1000 cents).',
  };
}