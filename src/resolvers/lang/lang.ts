import {
  Resolver, Query, Arg, UseMiddleware,
} from 'type-graphql';
import { getFieldErrors } from '../../util/validatorjs';
import Lang from '../../db/entities/Lang';
import isAuth from '../../util/graphql/isAuth';
import ValidatorError from '../../util/exceptions/ValidatorError';
import MessageError from '../../util/exceptions/MessageError';

@Resolver()
class LangResolver {
  @Query(() => Lang)
  @UseMiddleware(isAuth)
  async lang(@Arg('langID') langID: string): Promise<Lang> {
    const errors = await getFieldErrors({ langID }, { langID: 'required|string' });
    if (errors) {
      throw new ValidatorError(errors);
    }
    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(`The lang ${langID} doesn't exists`);
    }
    return lang;
  }
}

export default LangResolver;
