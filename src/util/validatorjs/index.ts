import FieldError from 'resolvers/errors/FieldError';
import Validator, { ValidationErrors } from 'validatorjs';
import { getConnection } from 'typeorm';

/**
 * Password must contain at least one uppercase letter, one lowercase letter and one number
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
Validator.register(
  'strict_password',
  (password) => passwordRegex.test(password as string),
  'password must contain at least one uppercase letter, one lowercase letter and one number',
);

/**
 * Checks if incoming value already exist for unique and non-unique fields in the database
 * e.g email: required|email|unique:user,email
 */
Validator.registerAsync(
  'unique',
  async (id, attribute, _, passes) => {
    // Error code
    if (!attribute) {
      throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    }

    // split table and column
    const attArr = attribute.split(',');
    // Error code
    if (attArr.length !== 2) {
      throw new Error(`Invalid format for validation rule on ${attribute}`);
    }
    // assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;

    const sql = `SELECT count(${column}) FROM ${table} WHERE ${column} = $1`;
    const data = await getConnection().query(sql, [id]);
    if (data[0].count > 0) {
      return passes(false, `${column} is already in use`);
    }
    return passes();
  },
  '', // I do not know if this attr works for something? But it is mandatory
);

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

export function getErrors<T>(
  body: T,
  rules: Validator.Rules,
  customMessages?: Validator.ErrorMessages,
) {
  // This is a ESLint config issue
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve: (errors?: ValidationErrors) => void) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => resolve());
    validation.fails(() => resolve(validation.errors.errors));
  });
}

export async function getFieldErrors<T>(
  body: T,
  rules: Validator.Rules,
  customMessages?: Validator.ErrorMessages,
): Promise<FieldError[] | null> {
  const errors = await getErrors(body, rules, customMessages);
  if (errors) {
    return validationToFieldError(errors);
  }
  return null;
}

export default Validator;
