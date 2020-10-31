import AuthenticationError from './AuthenticationError';
import MessageError from './MessageError';
import ValidatorError from './ValidatorError';

const isValidException = (error: Error) => (
  error instanceof MessageError
  || error instanceof ValidatorError
  || error instanceof AuthenticationError
);

export default isValidException;
