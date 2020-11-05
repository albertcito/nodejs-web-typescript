import rolesEnum from '../role/role.enum';
import Role from '~src/db/entities/Role';

/**
 * The user has to have at least one of those roles
 * @param userRoles
 * @param roles
 */
const verifyRolesUser = (userRoles: Role[], roles: rolesEnum[]): boolean => {
  for (let i = 0; i < roles.length; i += 1) {
    const exists = userRoles.some((userRole) => userRole.roleID === roles[i]);
    if (exists) {
      return true;
    }
  }
  return false;
};

export default verifyRolesUser;
