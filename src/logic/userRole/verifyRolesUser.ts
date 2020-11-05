import rolesEnum from '../role/role.enum';
import Role from '../../db/entities/Role';

const verifyRolesUser = (userRoles: Role[], roles: rolesEnum[]): boolean => {
  for (let i = 0; i < roles.length; i += 1) {
    const exists = userRoles.some((userRole) => userRole.roleID === roles[i]);
    if (!exists) {
      return false;
    }
  }
  return true;
};

export default verifyRolesUser;
