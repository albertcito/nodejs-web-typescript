import Validator from 'validatorjs';
import { createMethodDecorator } from 'type-graphql';
import { validateOrFail } from '.';

function Validate(rules: Validator.Rules, customMessages?: Validator.ErrorMessages) {
  return createMethodDecorator(async ({ args }, next) => {
    await validateOrFail(args, rules, customMessages);
    return next();
  });
}

export default Validate;
