import { __ } from 'i18n';
import {
  Controller, Param, Get, Authorized,
} from 'routing-controllers';
import Lang from '../../db/entities/Lang';
import Paginate from '../../util/db/paginate';
import MessageError from '../../util/exceptions/MessageError';
import roles from '../../logic/role/role.enum';

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
