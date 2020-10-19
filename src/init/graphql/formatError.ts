import { GraphQLError, GraphQLFormattedError, formatError as GraphQLFormatError } from 'graphql';
import { ValidatorError } from 'validatorjs-decorator';
import MessageError from '../../util/exceptions/MessageError';
import validationToFieldError from '../../util/validatorjs/validationToFieldError';

const formatError = (error: GraphQLError): GraphQLFormattedError => {
  const { originalError } = error;
  if (originalError instanceof ValidatorError) {
    return {
      message: error.message,
      extensions: {
        errors: validationToFieldError(originalError.errors),
      },
    };
  }

  if (originalError instanceof MessageError) {
    return { message: error.message };
  }

  return GraphQLFormatError(error);
};

export default formatError;
