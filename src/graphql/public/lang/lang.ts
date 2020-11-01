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
  @Validate({ langID: 'required|string' })
  async lang(@Arg('langID') langID: string): Promise<Lang> {
    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(__('The item %s does not exists', langID));
    }
    return lang;
  }
}

export default LangResolver;
