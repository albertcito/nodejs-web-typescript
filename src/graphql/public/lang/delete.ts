import { __ } from 'i18n';
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
      throw new MessageError(__('The item %s was removed', langID));
    }

    if (lang.isBlocked) {
      throw new MessageError(__('The item %s is blocked', langID));
    }

    await lang.remove();

    return __('The item %s was removed');
  }
}

export default LangDeleteResolver;
