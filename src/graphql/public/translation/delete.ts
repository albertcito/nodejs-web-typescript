import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import MessageField from '../../type/MessageField';
import MessageType from '../../type/MessageType.enum';

import Translation from '~src/db/entities/Translation';
import MessageError from '~src/util/exceptions/MessageError';
import roles from '~src/logic/role/role.enum';
import isAuthRolesGraphQL from '~src/util/graphql/isAuthRolesGraphQL';
import Auth from '~src/util/session/Auth';
import { isSuperAdmin } from '~src/logic/userRole/verifyRolesUser';

@Resolver()
class TranslationDeleteResolver {
  @isAuthRolesGraphQL([roles.superAdmin, roles.admin])
  @Mutation(() => MessageField)
  async translationDelete(@Arg('translationID', () => Int) translationID: number): Promise<MessageField> {
    const translation = await Translation.findOne(translationID);
    if (!translation) {
      throw new MessageError(__('The item %s does not exists', `${translationID}`));
    }

    const userRoles = Auth.data()?.user.roles ?? [];
    if (translation.isBlocked && !isSuperAdmin(userRoles)) {
      throw new MessageError(__('The item %s is blocked, only a super admin can modify it', `${translationID}`));
    }

    await translation.remove();

    return {
      message: __('The item %s was removed', `${translationID}`),
      type: MessageType.success,
    };
  }
}

export default TranslationDeleteResolver;
