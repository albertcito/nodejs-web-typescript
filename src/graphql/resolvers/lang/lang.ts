import { __ } from 'i18n';
import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Lang from 'src/db/entities/Lang';
import MessageError from 'src/util/exceptions/MessageError';
import Validate from 'src/util/validatorjs/validateGraphQL';

@Resolver()
class LangResolver {
  @Query(() => Lang)
  @Validate({ id: 'required|string' })
  async lang(@Arg('id') id: string): Promise<Lang> {
    const lang = await Lang.findOne(id);
    if (!lang) {
      throw new MessageError(__('The item %s does not exists', id));
    }
    return lang;
  }
}

export default LangResolver;
