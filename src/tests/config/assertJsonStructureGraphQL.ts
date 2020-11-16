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
    // eslint-disable-next-line no-console
    console.log({ serverError: res.error });
    return {
      status: false,
      description: 'assert unknown error',
    };
  }

  if (res.serverError) {
    // eslint-disable-next-line no-console
    console.log({ serverError: res.error });
    return {
      status: false,
      description: 'Server Error',
    };
  }

  if (res.body.errors) {
    // eslint-disable-next-line no-console
    console.info({
      status: res.status,
      body: res.body,
      errors: res.body.errors,
    });
    return {
      status: false,
      description: 'The query return errors',
    };
  }

  if (!res.body.data) {
    // eslint-disable-next-line no-console
    console.info({ body: res.body });
    return {
      status: false,
      description: 'The query data is empty',
    };
  }

  const errors = await getAsyncErrors(res.body.data, rules);

  if (errors) {
    // eslint-disable-next-line no-console
    console.error({ errors });
    // eslint-disable-next-line no-console
    console.info({
      data: res.body.data,
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
