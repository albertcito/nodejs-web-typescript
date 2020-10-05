import {
  Resolver, Mutation, Ctx, Arg,
} from 'type-graphql';

import { ApolloServerContext } from '../../../init/apollo/ApolloServerContext';
import Lang from '../../../db/entities/Lang';
import { getFieldErrors } from '../../../util/validatorjs';
import LangResponse from '../LangResponse';

@Resolver()
class LangDeleteResolver {
  @Mutation(() => LangResponse)
  async langDelete(
    @Arg('langID') langID: string,
    @Ctx() { db }: ApolloServerContext,
  ): Promise<LangResponse> {
    const errors = await getFieldErrors({ langID }, { langID: 'required|string' });
    if (errors) {
      return { errors };
    }

    const lang = await db.manager.findOne(Lang, langID);
    if (!lang) {
      return {
        errors: [{
          field: 'langID',
          messages: [`The lang ${langID} doesn't exists`],
        }],
      };
    }

    if (lang.isBlocked) {
      return {
        errors: [{
          field: 'langID',
          messages: [`The lang ${langID} is blocked`],
        }],
      };
    }

    await Lang.delete({ langID });

    return { lang };
  }
}

export default LangDeleteResolver;
