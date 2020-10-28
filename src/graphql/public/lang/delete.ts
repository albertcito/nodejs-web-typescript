import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';
import Validate from '../../../util/validatorjs/validateGraphQL';

@Resolver()
class LangDeleteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  @Validate({ langID: 'required|string' })
  async langDelete(@Arg('langID') langID: string): Promise<string> {
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
