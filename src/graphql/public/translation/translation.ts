import { __ } from 'i18n';
import {
  Resolver, Query, Arg, Int,
} from 'type-graphql';

import Translation from '~src/db/entities/Translation';
import MessageError from '~src/util/exceptions/MessageError';

@Resolver()
class TranslationResolver {
  @Query(() => Translation)
  async translation(@Arg('id', () => Int) id: number): Promise<Translation> {
    const translation = await Translation.findOne(id);
    if (!translation) {
      throw new MessageError(__('The item %s does not exists', `${id}`));
    }
    return translation;
  }
}

export default TranslationResolver;
