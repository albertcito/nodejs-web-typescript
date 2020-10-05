import {
  Resolver, Mutation, Ctx, Arg,
} from 'type-graphql';

import { ApolloServerContext } from '../../../init/apollo/ApolloServerContext';
import Lang from '../../../db/entities/Lang';
import { LangInput, rules } from './LangInput';
import { getFieldErrors } from '../../../util/validatorjs';
import LangResponse from '../LangResponse';

@Resolver()
class LangCreateResolver {
  @Mutation(() => LangResponse)
  async langCreate(
    @Arg('options') options: LangInput,
    @Ctx() { db }: ApolloServerContext,
  ): Promise<LangResponse> {
    const errors = await getFieldErrors(options, rules);
    if (errors) {
      return { errors };
    }

    const lang = new Lang();
    lang.langID = options.langID;
    lang.name = options.name;
    lang.localname = options.localname;
    lang.isBlocked = options.isBlocked ?? false;
    lang.active = options.active ?? false;
    await db.manager.save(lang);

    return { lang };
  }
}

export default LangCreateResolver;
