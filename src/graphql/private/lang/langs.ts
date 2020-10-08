import {
  Resolver, Query, UseMiddleware,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import isAuth from '../../../util/graphql/isAuth';

@Resolver()
class LangResolver {
  @Query(() => [Lang])
  @UseMiddleware(isAuth)
  langs() {
    return Lang.find({});
  }
}

export default LangResolver;
