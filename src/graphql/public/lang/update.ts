// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware, ObjectType,
} from 'type-graphql';

import MessageResponse from '../../type/MessageResponse';
import MessageType from '../../type/MessageType.enum';

import Lang from '~src/db/entities/Lang';
import MessageError from '~src/util/exceptions/MessageError';
import isAuth from '~src/util/graphql/isAuth';
import Validate from '~src/util/validatorjs/validateGraphQL';

@ObjectType()
class LangUpdateResponse extends MessageResponse(Lang) {}

@Resolver()
class LangUpdateResolver {
  @Mutation(() => LangUpdateResponse)
  @UseMiddleware(isAuth)
  @Validate({
    id: 'required|string',
    name: 'required|string',
    localname: 'required|string|min:1',
    active: 'boolean',
    isBlocked: 'boolean',
  })
  async langUpdate(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Arg('localname') localname: string,
    @Arg('active', { nullable: true }) active: boolean,
    @Arg('isBlocked', { nullable: true }) isBlocked: boolean,
  ): Promise<LangUpdateResponse> {
    const lang = await Lang.findOne(id);
    if (!lang) {
      throw new MessageError(__('The item %s does not exists', id));
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
        message: __('The item %s was updated', `${id}`),
        type: MessageType.success,
      },
    };
  }
}

export default LangUpdateResolver;
