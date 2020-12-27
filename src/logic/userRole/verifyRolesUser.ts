import Role from 'src/db/entities/Role';
import rolesEnum from '../role/role.enum';

export const isUserRole = (userRoles: Role[], roles: rolesEnum) => userRoles.some(
  (userRole) => userRole.id === roles,
);

export const isSuperAdmin = (userRoles: Role[]) => userRoles.some(
  (userRole) => userRole.id === rolesEnum.superAdmin,
);

/**
 * The user has to have at least one of those roles
 * @param userRoles
 * @param roles
 */
export const verifyRolesUser = (userRoles: Role[], roles: rolesEnum[]): boolean => {
  for (let i = 0; i < roles.length; i += 1) {
    const exists = isUserRole(userRoles, roles[i]);
    if (exists) {
      return true;
    }
  }
  return false;
};
