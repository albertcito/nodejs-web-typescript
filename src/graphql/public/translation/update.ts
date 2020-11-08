// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, Arg, UseMiddleware, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageResponse from '../../type/MessageResponse';

import Translation from '~src/db/entities/Translation';
import isAuth from '~src/util/graphql/isAuth';
import TextInputUpdate from '~src/graphql/input/TextInputUpdate';
import TranslationUpdate from '~src/logic/lang/TranslationUpdate';
import MessageType from '~src/graphql/type/MessageType.enum';
import MessageError from '~src/util/exceptions/MessageError';

@ObjectType()
class TranslationUpdateResponse extends MessageResponse(Translation) {}

@Resolver()
export default class TranslationUpdateResolver {
  @Mutation(() => TranslationUpdateResponse)
  @UseMiddleware(isAuth)
  async translationUpdate(
    @Arg('translationID') translationID: string,
    @Arg('texts', () => [TextInputUpdate]) texts: TextInputUpdate[],
    @Arg('code') code: string,
    @Arg('isBlocked', { nullable: true, defaultValue: false }) isBlocked: boolean,
  ): Promise<TranslationUpdateResponse> {
    const translation = await Translation.findOne(translationID);
    if (!translation) {
      throw new MessageError(__('The item %s does not exists', translationID));
    }
    const translationUpdated = await (new TranslationUpdate(
      translation,
      texts,
    )).save({ code, isBlocked });

    return {
      data: translationUpdated,
      message: {
        message: __('The item %s was Updated', `${translationUpdated.translationID}`),
        type: MessageType.success,
      },
    };
  }
}
