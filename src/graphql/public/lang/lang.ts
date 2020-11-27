import { __ } from 'i18n';
import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import MessageError from '../../../util/exceptions/MessageError';
import Validate from '../../../util/validatorjs/validateGraphQL';

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
