import { GraphQLError, GraphQLFormattedError, formatError as GraphQLFormatError } from 'graphql';
import MessageError from './MessageError';
import ValidatorError from './ValidatorError';

const formatError = (error: GraphQLError): GraphQLFormattedError => {
  const { originalError } = error;
  if (originalError instanceof ValidatorError) {
    return {
      message: error.message,
      extensions: {
        errors: originalError.errors,
      },
    };
  }

  if (originalError instanceof MessageError) {
    return { message: error.message };
  }

  return GraphQLFormatError(error);
};

export default formatError;
