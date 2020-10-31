import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { HttpQueryError } from 'apollo-server-core';
import Bugsnag from '@bugsnag/js';

import AuthenticationError from '../../../util/exceptions/AuthenticationError';
import Auth from '../../../util/session/Auth';
import isValidException from '../../../util/exceptions/isValidException';

// I tried to do it like the Apollo test, but its doesn't works
// https://github.com/apollographql/apollo-server/blob/1af2792ed9e18f2bf218a29c2f4f128b6588f9ca/packages/apollo-server-integration-testsuite/src/ApolloServer.ts#L661
const ErrorHandlePlugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      willSendResponse(requestContext) {
        const errors = requestContext.errors ?? [];
        // eslint-disable-next-line no-restricted-syntax
        for (const error of errors) {
          const { originalError } = error;
          if (originalError instanceof AuthenticationError) {
            throw new HttpQueryError(403, originalError.message, false);
          }
          if (originalError && !isValidException(originalError)) {
            const auth = Auth.data()?.auth;
            Bugsnag.notify(originalError ?? error, (event) => {
              event.addMetadata('graphql', {
                source: requestContext.source,
                operationName: requestContext.operationName,
                variables: requestContext.request.variables,
                ...requestContext.operation,
              });
              event.addMetadata('request', {
                url: event.request.url,
                httpMethod: event.request.httpMethod,
                clientIp: event.request.clientIp,
                referer: event.request.referer,
                userID: auth?.userID,
                oauthAccessTokenID: auth?.oauthAccessTokenID,
                ...event.request.headers,
              });
            });
          }
        }
      },
    };
  },
};

export default ErrorHandlePlugin;
