import {
  Resolver, Mutation, Ctx, Arg,
} from 'type-graphql';

import { ApolloServerContext } from '../../../init/apollo/ApolloServerContext';
import Lang from '../../../db/entities/Lang';
import { LangInput, rules } from '../create/LangInput';
import { getFieldErrors } from '../../../util/validatorjs';
import LangResponse from '../LangResponse';

@Resolver()
class LangUpdateResolver {
  @Mutation(() => LangResponse)
  async langUpdate(
    @Arg('options') options: LangInput,
    @Ctx() { db }: ApolloServerContext,
  ): Promise<LangResponse> {
    const existsRules = {
      ...rules,
      langID: 'required|string',
    };
    const errors = await getFieldErrors(options, existsRules);
    if (errors) {
      return { errors };
    }

    const lang = await db.manager.findOne(Lang, options.langID);
    if (!lang) {
      return {
        errors: [{
          field: 'langID',
          messages: [`The lang ${options.langID} doesn't exists`],
        }],
      };
    }

    lang.name = options.name;
    lang.localname = options.localname;
    if (options.isBlocked) {
      lang.isBlocked = options.isBlocked;
    }
    if (options.active) {
      lang.active = options.active;
    }

    await db.manager.save(lang);

    return { lang };
  }
}

export default LangUpdateResolver;
