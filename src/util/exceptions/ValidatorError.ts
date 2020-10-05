import FieldError from '../../resolvers/type/FieldError';

class ValidatorError extends Error {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public readonly errors: FieldError[],
    // eslint-disable-next-line no-unused-vars
    public readonly message: string = 'The following errors missing xD',
  ) {
    super();
    Object.setPrototypeOf(this, ValidatorError.prototype);
  }
}

export default ValidatorError;
