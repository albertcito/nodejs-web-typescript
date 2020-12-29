import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Lang from 'src/db/entities/Lang';
import Validate from 'src/util/validatorjs/validateGraphQL';

@Resolver()
class LangResolver {
  @Query(() => Lang)
  @Validate({ id: 'required|string' })
  async lang(@Arg('id') id: string): Promise<Lang> {
    return Lang.findOneOrFail(id);
  }
}

export default LangResolver;
