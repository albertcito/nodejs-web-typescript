import { ApolloServerPlugin, GraphQLRequestContextWillSendResponse } from 'apollo-server-plugin-base';
import { HttpQueryError } from 'apollo-server-core';

import HttpStatusError from '../../../util/exceptions/HttpStatusError';
import isValidException from '../../../util/exceptions/isValidException';
import { ApolloServerContext } from '../ApolloServerContext';
import notify from '../../bugsnag/notify';

// I tried to do it like the Apollo test, but its doesn't works
// https://github.com/apollographql/apollo-server/blob/1af2792ed9e18f2bf218a29c2f4f128b6588f9ca/packages/apollo-server-integration-testsuite/src/ApolloServer.ts#L661
const ErrorHandlePlugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      willSendResponse(requestContext: GraphQLRequestContextWillSendResponse<ApolloServerContext>) {
        const errors = requestContext.errors ?? [];
        // eslint-disable-next-line no-restricted-syntax
        for (const error of errors) {
          const { originalError } = error;
          if (originalError instanceof HttpStatusError) {
            throw new HttpQueryError(originalError.code, originalError.message, false);
          }
          if (originalError && !isValidException(originalError)) {
            notify(originalError, requestContext.context.req);
          }
        }
      },
    };
  },
};

export default ErrorHandlePlugin;
