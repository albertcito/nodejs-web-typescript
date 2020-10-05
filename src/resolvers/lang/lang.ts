import { ApolloServerContext } from 'init/apollo/ApolloServerContext';
import {
  Resolver, Query, Arg, Ctx, UseMiddleware,
} from 'type-graphql';
import { getFieldErrors } from '../../util/validatorjs';
import Lang from '../../db/entities/Lang';
import LangResponse from './LangResponse';
import isAuth from '../../util/graphql/isAuth';

@Resolver()
class LangResolver {
  @Query(() => Lang)
  @UseMiddleware(isAuth)
  async lang(
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
    return { lang };
  }
}

export default LangResolver;
