import { __ } from 'i18n';
import { Validator } from 'validatorjs-decorator';

class ValidatorError extends Error {
  constructor(
    public readonly errors: Validator.ValidationErrors,
    public readonly message: string = __('Please, review the following errors:'),
  ) {
    super();
    Object.setPrototypeOf(this, ValidatorError.prototype);
  }
}

export default ValidatorError;
