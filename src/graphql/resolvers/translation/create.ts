// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, Arg, UseMiddleware, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageResponse from '../../type/MessageResponse';
import MessageType from '../../type/MessageType.enum';
import TextInputCreate from '../../input/TextInputCreate';
import Translation from 'src/db/entities/Translation';
import isAuth from 'src/util/graphql/isAuth';
import TranslationCreate from '../../../logic/translation/TranslationCreate';

@ObjectType()
class TranslationCreateResponse extends MessageResponse(Translation) {}

@Resolver()
export default class TranslationCreateResolver {
  @Mutation(() => TranslationCreateResponse)
  @UseMiddleware(isAuth)
  async translationCreate(
    @Arg('texts', () => [TextInputCreate]) texts: TextInputCreate[],
    @Arg('code', { nullable: true }) code?: string,
    @Arg('isBlocked', { nullable: true, defaultValue: false }) isBlocked?: boolean,
  ): Promise<TranslationCreateResponse> {
    const translation = await (new TranslationCreate(texts)).save({ code, isBlocked });
    return {
      data: translation,
      message: {
        message: __('The item %s was created', `${translation.id}`),
        type: MessageType.success,
      },
    };
  }
}
