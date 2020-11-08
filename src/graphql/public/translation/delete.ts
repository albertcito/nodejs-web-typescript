import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';

import Translation from '~src/db/entities/Translation';
import MessageError from '~src/util/exceptions/MessageError';
import isAuth from '~src/util/graphql/isAuth';
import Validate from '~src/util/validatorjs/validateGraphQL';

@Resolver()
class TranslationDeleteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  @Validate({ translationID: 'required|string' })
  async translationDelete(@Arg('translationID') translationID: string): Promise<string> {
    const translation = await Translation.findOne(translationID);
    if (!translation) {
      throw new MessageError(__('The item %s was removed', translationID));
    }

    if (translation.isBlocked) {
      throw new MessageError(__('The item %s is blocked', translationID));
    }

    await translation.remove();

    return __('The item %s was removed');
  }
}

export default TranslationDeleteResolver;
