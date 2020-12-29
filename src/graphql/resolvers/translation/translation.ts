import {
  Resolver, Query, Arg, Int,
} from 'type-graphql';

import Translation from 'src/db/entities/Translation';

@Resolver()
class TranslationResolver {
  @Query(() => Translation)
  async translation(@Arg('id', () => Int) id: number): Promise<Translation> {
    return Translation.findOneOrFail(id);
  }
}

export default TranslationResolver;
