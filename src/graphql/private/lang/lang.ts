import {
  Resolver, Query, Arg, UseMiddleware,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import Validate from '../../../util/validatorjs/validateGraphQL';

@Resolver()
class LangResolver {
  @Query(() => Lang)
  @UseMiddleware(isAuth)
  @Validate({ langID: 'required|string' })
  async lang(@Arg('langID') langID: string): Promise<Lang> {
    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(`The lang ${langID} doesn't exists`);
    }
    return lang;
  }
}

export default LangResolver;
