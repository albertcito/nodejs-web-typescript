import { Validator } from 'validatorjs-decorator/dist';

export default abstract class GenericTestData {
  abstract resolver(): any;

  abstract rules(): Validator.Rules;
}
