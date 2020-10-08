import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import { getFieldErrors } from '../../../util/validatorjs';
import ValidatorError from '../../../util/exceptions/ValidatorError';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';

@Resolver()
class LangDeleteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async langDelete(
    @Arg('langID') langID: string,
  ): Promise<string> {
    const errors = await getFieldErrors({ langID }, { langID: 'required|string' });
    if (errors) {
      throw new ValidatorError(errors);
    }

    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(`The lang "${langID}" doesn't exists`);
    }

    if (lang.isBlocked) {
      throw new MessageError(`The lang "${langID}" is blocked`);
    }

    await lang.remove();

    return `The lang "${langID}" was successfully removed`;
  }
}

export default LangDeleteResolver;
