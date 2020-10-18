import { Validator } from 'validatorjs-decorator';

class ValidatorError extends Error {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public readonly errors: Validator.ValidationErrors,
    // eslint-disable-next-line no-unused-vars
    public readonly message: string = 'The following errors missing',
  ) {
    super();
    Object.setPrototypeOf(this, ValidatorError.prototype);
  }
}

export default ValidatorError;
