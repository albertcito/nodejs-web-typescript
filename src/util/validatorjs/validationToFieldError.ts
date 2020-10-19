import { ValidationErrors } from 'validatorjs-decorator';
import FieldError from '../../graphql/type/FieldError';

const validationToFieldError = (validationErrors: ValidationErrors): FieldError[] => {
  const fieldErrors: FieldError[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const field in validationErrors) {
    if (Object.prototype.hasOwnProperty.call(validationErrors, field)) {
      const messages = validationErrors[field];
      fieldErrors.push({
        field,
        messages,
      });
    }
  }
  return fieldErrors;
};

export default validationToFieldError;
