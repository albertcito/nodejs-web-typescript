import { Response } from 'supertest';
import { Validator, getAsyncErrors } from 'validatorjs-decorator/dist';

const assertJsonStructureGraphQL = async (
  done: jest.DoneCallback,
  res: Response,
  err: any,
  rules: Validator.Rules,
) => {
  if (err) { done.fail(err); }

  if (res.body.errors) {
    // eslint-disable-next-line no-console
    console.info(res.body);
    done.fail('The query return errors');
  }

  if (!res.body.data) {
    // eslint-disable-next-line no-console
    console.info(res.body);
    done.fail('The query data is empty');
  }

  const errors = await getAsyncErrors(res.body.data, rules);

  if (errors) {
    // eslint-disable-next-line no-console
    console.error(errors);
    // eslint-disable-next-line no-console
    console.info(res.body);
    done.fail('The response does not match with the expected result');
  } else {
    done();
  }
};

export default assertJsonStructureGraphQL;
