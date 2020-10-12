import Validator from 'validatorjs';

import ValidatorError from '../exceptions/ValidatorError';
import { getFieldErrors } from '.';

const requiredMetadataKey = Symbol('key');

interface NameIndex {
  name: string;
  index: number;
}
interface Struct {
  [key: string] : any;
}

export function arg(name: string) {
  return function setParamSchemaMetadata(
    target: Object,
    propertyKey: string | symbol,
    index: number,
  ) {
    const existingParameters: NameIndex[] = Reflect
      .getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingParameters.push({ name, index });
    Reflect.defineMetadata(
      requiredMetadataKey,
      existingParameters,
      target,
      propertyKey,
    );
  };
}

export function validate(rules: Validator.Rules, customMessages?: Validator.ErrorMessages) {
  return function internatValidate(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function descriptorValue(...args: any[]) {
      const parameters: NameIndex[] = Reflect.getOwnMetadata(
        requiredMetadataKey,
        target,
        propertyName,
      );
      const argsAsObject: Struct = {};
      if (parameters) {
        for (let i = 0; i < parameters.length; i += 1) {
          const param = parameters[i];
          argsAsObject[param.name] = args[param.index];
        }
        const errors = await getFieldErrors(argsAsObject, rules, customMessages);
        if (errors) {
          throw new ValidatorError(errors, 'Please, review the following errors:');
        }
      }
      return method.apply(this, args);
    };
  };
}
