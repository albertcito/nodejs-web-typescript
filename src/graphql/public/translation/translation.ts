import { __ } from 'i18n';
import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Translation from '~src/db/entities/Translation';
import MessageError from '~src/util/exceptions/MessageError';

@Resolver()
class TranslationResolver {
  @Query(() => Translation)
  async translation(@Arg('translationID') translationID: number): Promise<Translation> {
    const translation = await Translation.findOne(translationID);
    if (!translation) {
      throw new MessageError(__('The item %s does not exists', `${translationID}`));
    }
    return translation;
  }
}

export default TranslationResolver;
