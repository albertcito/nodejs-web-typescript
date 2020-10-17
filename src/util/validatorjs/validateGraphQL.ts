import Validator from 'validatorjs';
import { ValidatorError, getAsyncErrors } from 'validatorjs-decorators';
import { createMethodDecorator } from 'type-graphql';

function Validate(rules: Validator.Rules, customMessages?: Validator.ErrorMessages) {
  return createMethodDecorator(async ({ args }, next) => {
    const errors = await getAsyncErrors(args, rules, customMessages);
    if (errors) {
      throw new ValidatorError(errors, 'Please, review the following errors:');
    }
    return next();
  });
}

export default Validate;
