import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import HttpStatusError from './HttpStatusError';
import MessageError from './MessageError';
import ValidatorError from './ValidatorError';

const isValidException = (error: Error) => (
  error instanceof MessageError
  || error instanceof ValidatorError
  || error instanceof HttpStatusError
  || error instanceof EntityNotFoundError
);

export default isValidException;
