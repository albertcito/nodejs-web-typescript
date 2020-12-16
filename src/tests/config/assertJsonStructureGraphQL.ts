/* eslint-disable no-console */
import { Response } from 'supertest';
import { Validator, getAsyncErrors } from 'validatorjs-decorator/dist';

interface AssertJsonStructureGraphQLResult {
  status: boolean;
  description: string;
}
const assertJsonStructureGraphQL = async (
  res: Response,
  err: any,
  rules: Validator.Rules,
): Promise<AssertJsonStructureGraphQLResult> => {
  if (err) {
    console.error({ serverError: res.error });
    return {
      status: false,
      description: 'assert unknown error',
    };
  }

  if (res.serverError) {
    console.error({ serverError: res.error });
    return {
      status: false,
      description: 'Server Error',
    };
  }

  if (res.body.errors) {
    console.error({
      status: res.status,
      body: res.body,
      message: res.body.errors[0].message,
      locations: res.body.errors[0].locations,
      path: res.body.errors[0].path,
      extensions: res.body.errors[0].extensions,
    });
    return {
      status: false,
      description: 'The query return errors',
    };
  }

  if (!res.body.data) {
    console.error({ body: res.body });
    return {
      status: false,
      description: 'The query data is empty',
    };
  }

  const errors = await getAsyncErrors(res.body.data, rules);

  if (errors) {
    console.error({ errors });
    console.warn({
      data: JSON.stringify(res.body.data),
    });
    return {
      status: false,
      description: 'The response does not match with the expected result',
    };
  }

  return {
    status: true,
    description: 'It works !',
  };
};

export default assertJsonStructureGraphQL;
