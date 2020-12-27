import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';

import Lang from 'src/db/entities/Lang';
import MessageError from 'src/util/exceptions/MessageError';
import isAuth from 'src/util/graphql/isAuth';
import Validate from 'src/util/validatorjs/validateGraphQL';

@Resolver()
class LangDeleteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  @Validate({ id: 'required|string' })
  async langDelete(@Arg('id') id: string): Promise<string> {
    const lang = await Lang.findOne(id);
    if (!lang) {
      throw new MessageError(__('The item %s was removed', id));
    }

    if (lang.isBlocked) {
      throw new MessageError(__('The item %s is blocked', id));
    }

    await lang.remove();

    return __('The item %s was removed');
  }
}

export default LangDeleteResolver;
