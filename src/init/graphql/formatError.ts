import { GraphQLError, GraphQLFormattedError, formatError as GraphQLFormatError } from 'graphql';
import MessageError from '../../util/exceptions/MessageError';
import ValidatorError from '../../util/exceptions/ValidatorError';

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
