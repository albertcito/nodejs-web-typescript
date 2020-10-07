import { MoreThan } from 'typeorm';
import OauthAccessToken from '../../db/entities/OauthAccessToken';
import getLoggedUser from './getLoggedUser';

const getOauthTokenValid = async (): Promise<string> => {
  const now = new Date();
  const token = await OauthAccessToken.findOne({
    where: {
      expiredAt: MoreThan(now),
    },
  });

  if (token) {
    return token.token;
  }

  const login = await getLoggedUser();
  return login.token;
};

export default getOauthTokenValid;
