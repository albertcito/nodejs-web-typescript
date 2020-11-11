import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware, Int,
} from 'type-graphql';

import MessageField from '../../type/MessageField';
import MessageType from '../../type/MessageType.enum';

import Translation from '~src/db/entities/Translation';
import MessageError from '~src/util/exceptions/MessageError';
import isAuth from '~src/util/graphql/isAuth';

@Resolver()
class TranslationDeleteResolver {
  @Mutation(() => MessageField)
  @UseMiddleware(isAuth)
  async translationDelete(@Arg('translationID', () => Int) translationID: number): Promise<MessageField> {
    const translation = await Translation.findOne(translationID);
    if (!translation) {
      throw new MessageError(__('The item %s does not exists', `${translationID}`));
    }

    if (translation.isBlocked) {
      throw new MessageError(__('The item %s is blocked', `${translationID}`));
    }

    await translation.remove();

    return {
      message: __('The item %s was removed', `${translationID}`),
      type: MessageType.success,
    };
  }
}

export default TranslationDeleteResolver;
