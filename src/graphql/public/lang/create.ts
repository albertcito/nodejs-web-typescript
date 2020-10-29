import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';
import { getManager } from 'typeorm';

import Lang from '../../../db/entities/Lang';
import isAuth from '../../../util/graphql/isAuth';
import Validate from '../../../util/validatorjs/validateGraphQL';

const { tablePath } = getManager().getRepository(Lang).metadata;
@Resolver()
class LangCreateResolver {
  @Mutation(() => Lang)
  @UseMiddleware(isAuth)
  @Validate({
    langID: `required|string|unique:${tablePath},lang_id`,
    name: 'required|string',
    localname: 'required|string|min:1',
    active: 'boolean',
    isBlocked: 'boolean',
  })
  async langCreate(
    @Arg('langID') langID: string,
    @Arg('name') name: string,
    @Arg('localname') localname: string,
    @Arg('active', { nullable: true, defaultValue: false }) active: boolean,
    @Arg('isBlocked', { nullable: true, defaultValue: false }) isBlocked: boolean,
  ): Promise<Lang> {
    const lang = new Lang();
    lang.langID = langID;
    lang.name = name;
    lang.localname = localname;
    lang.isBlocked = isBlocked ?? false;
    lang.active = active ?? false;
    await lang.save();
    return lang;
  }
}

export default LangCreateResolver;
