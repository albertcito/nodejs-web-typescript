import {
  Controller, Param, Get, Authorized,
} from 'routing-controllers';

import Lang from 'src/db/entities/Lang';
import Paginate from 'src/util/db/paginate';
import roles from 'src/logic/role/role.enum';

@Controller()
export default class LangController {
  @Authorized([roles.superAdmin])
  @Get('/langs')
  getAll() {
    return (new Paginate(Lang.createQueryBuilder())).get();
  }

  @Get('/langs/:langID')
  async getOne(@Param('langID') langID: string) {
    return Lang.findOneOrFail(langID);
  }
}
