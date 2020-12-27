import { ApolloError } from 'apollo-server-core';
import { GraphQLError, GraphQLFormattedError, formatError as GraphQLFormatError } from 'graphql';
import { ValidatorError } from 'validatorjs-decorator';

import MessageError from 'src/util/exceptions/MessageError';

const formatError = (error: GraphQLError): GraphQLFormattedError => {
  const { originalError } = error;
  if (originalError instanceof ValidatorError) {
    return GraphQLFormatError(new ApolloError(
      error.message,
      'ValidatorError',
      {
        errors: originalError.errors,
      },
    ));
  }

  if (originalError instanceof MessageError) {
    return GraphQLFormatError(new ApolloError(
      error.message,
      'MessageError',
      {
        message: error.message,
      },
    ));
  }

  return GraphQLFormatError(error);
};

export default formatError;
