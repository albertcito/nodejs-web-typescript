import Validator from 'validatorjs';

import ValidatorError from '../exceptions/ValidatorError';
import { getErrors } from '.';

const requiredMetadataKey = Symbol('key');

interface ValidatorConfig {
  name: string;
  index: number;
  rules: string;
}

interface Struct {
  [key: string] : any;
}

export function arg(name: string, rules: string) {
  return function setParamSchemaMetadata(
    target: Object,
    propertyKey: string | symbol,
    index: number,
  ) {
    const key = typeof propertyKey === 'undefined' ? 'constructor' : propertyKey;
    const existingParameters: ValidatorConfig[] = Reflect
      .getOwnMetadata(requiredMetadataKey, target, key) || [];
    existingParameters.push({ name, index, rules });
    Reflect.defineMetadata(requiredMetadataKey, existingParameters, target, key);
  };
}

const getValidatorParams = (args: any, target: any, propertyName: string) => {
  const parameters: ValidatorConfig[] = Reflect.getOwnMetadata(
    requiredMetadataKey,
    target,
    propertyName,
  );
  const body: Struct = {};
  const rules: Validator.Rules = {};
  if (parameters) {
    for (let i = 0; i < parameters.length; i += 1) {
      const param = parameters[i];
      body[param.name] = args[param.index];
      rules[param.name] = param.rules;
    }
  }
  return {
    body,
    rules,
  };
};

export function validate(customMessages?: Validator.ErrorMessages) {
  return function internatValidate(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function descriptorValue(...args: any[]) {
      const { body, rules } = getValidatorParams(args, target, propertyName);
      const validation = new Validator(body, rules, customMessages);
      if (validation.fails()) {
        throw new ValidatorError(
          validation.errors.errors,
          'Please, review the following errors:',
        );
      }
      return method.apply(this, args);
    };
  };
}

export function validateAsync(customMessages?: Validator.ErrorMessages) {
  return function internatValidate(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function descriptorValue(...args: any[]) {
      const { body, rules } = getValidatorParams(args, target, propertyName);
      const errors = await getErrors(body, rules, customMessages);
      if (errors) {
        throw new ValidatorError(errors, 'Please, review the following errors:');
      }
      return method.apply(this, args);
    };
  };
}

export function validateClass() {
  return function validateArgs(target: any) {
    // save a reference to the original constructor
    const original = target;
    // wrap orginal constructor with validation behaviour
    const f: any = function f(...args: any) {
      const { body, rules } = getValidatorParams(args, target, 'constructor');
      const validation = new Validator(body, rules);
      if (validation.fails()) {
        throw new ValidatorError(validation.errors.errors, 'Please, review the following errors:');
      }
      // eslint-disable-next-line new-cap
      const instance = new original(...args);
      return instance;
    };
    // set f's prototype to orginal's prototype so f keeps original's type
    f.prototype = original.prototype;
    return f;
  };
}
