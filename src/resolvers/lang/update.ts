import {
  Resolver, Mutation, Arg,
} from 'type-graphql';

import Lang from '../../db/entities/Lang';
import { LangInput, rules } from '../input/LangInput';
import { getFieldErrors } from '../../util/validatorjs';
import ValidatorError from '../../util/exceptions/ValidatorError';
import MessageError from '../../util/exceptions/MessageError';

@Resolver()
class LangUpdateResolver {
  @Mutation(() => Lang)
  async langUpdate(@Arg('options') options: LangInput): Promise<Lang> {
    const existsRules = {
      ...rules,
      langID: 'required|string',
    };
    const errors = await getFieldErrors(options, existsRules);
    if (errors) {
      throw new ValidatorError(errors);
    }

    const lang = await Lang.findOne(options.langID);
    if (!lang) {
      throw new MessageError(`The lang ${options.langID} doesn't exists`);
    }

    lang.name = options.name;
    lang.localname = options.localname;
    if (options.isBlocked) {
      lang.isBlocked = options.isBlocked;
    }
    if (options.active) {
      lang.active = options.active;
    }

    await lang.save();

    return lang;
  }
}

export default LangUpdateResolver;
