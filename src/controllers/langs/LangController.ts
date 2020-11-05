import { __ } from 'i18n';
import {
  Controller, Param, Get, Authorized,
} from 'routing-controllers';

import Lang from '~src/db/entities/Lang';
import Paginate from '~src/util/db/paginate';
import MessageError from '~src/util/exceptions/MessageError';
import roles from '~src/logic/role/role.enum';

@Controller()
export default class LangController {
  @Authorized([roles.superAdmin])
  @Get('/langs')
  getAll() {
    return (new Paginate(Lang.createQueryBuilder())).get();
  }

  @Get('/langs/:langID')
  async getOne(@Param('langID') langID: string) {
    const lang = await Lang.findOne(langID);
    if (!lang) {
      throw new MessageError(__('The item %s does not exists', langID));
    }
    return lang;
  }
}
