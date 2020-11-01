// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware, ObjectType,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';
import Validate from '../../../util/validatorjs/validateGraphQL';
import MessageResponse from '../../type/MessageResponse';

@ObjectType()
class LangUpdateResponse extends MessageResponse(Lang) {}

@Resolver()
class LangUpdateResolver {
  @Mutation(() => LangUpdateResponse)
  @UseMiddleware(isAuth)
  @Validate({
    langID: 'required|string',
    name: 'required|string',
    localname: 'required|string|min:1',
    active: 'boolean',
    isBlocked: 'boolean',
  })
  async langUpdate(
    @Arg('langID') langID: string,
    @Arg('name') name: string,
    @Arg('localname') localname: string,
    @Arg('active', { nullable: true }) active: boolean,
    @Arg('isBlocked', { nullable: true }) isBlocked: boolean,
  ): Promise<LangUpdateResponse> {
    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(__('The item %s does not exists', langID));
    }
    lang.name = name;
    lang.localname = localname;
    if (isBlocked) {
      lang.isBlocked = isBlocked;
    }
    if (active) {
      lang.active = active;
    }
    await lang.save();
    return {
      data: lang,
      message: {
        message: __('The item %s was updated', `${langID}`),
        type: 'success',
      },
    };
  }
}

export default LangUpdateResolver;
