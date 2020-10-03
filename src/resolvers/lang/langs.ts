import { ApolloServerContext } from 'ApolloServerContext';
import { Resolver, Query, Ctx } from 'type-graphql';
import Lang from '../../db/entities/Lang';

@Resolver()
class LangResolver {
  @Query(() => [Lang])
  langs(@Ctx() { db }: ApolloServerContext) {
    return db.manager.find(Lang, {});
  }
}

export default LangResolver;
