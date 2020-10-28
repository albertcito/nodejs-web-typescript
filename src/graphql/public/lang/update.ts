import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';
import Validate from '../../../util/validatorjs/validateGraphQL';

@Resolver()
class LangUpdateResolver {
  @Mutation(() => Lang)
  @UseMiddleware(isAuth)
  @Validate({
    langID: 'required|string',
    name: 'required|string',
    localname: 'required|string|min:1',
    active: 'boolean',
    isBlocked: 'boolean',
  })
  async langUpdate(
    @Arg('langID') langID: string,
    @Arg('name') name: string,
    @Arg('localname') localname: string,
    @Arg('active', { nullable: true }) active: boolean,
    @Arg('isBlocked', { nullable: true }) isBlocked: boolean,
  ): Promise<Lang> {
    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(`The lang ${langID} doesn't exists`);
    }
    lang.name = name;
    lang.localname = localname;
    if (isBlocked) {
      lang.isBlocked = isBlocked;
    }
    if (active) {
      lang.active = active;
    }
    await lang.save();
    return lang;
  }
}

export default LangUpdateResolver;
