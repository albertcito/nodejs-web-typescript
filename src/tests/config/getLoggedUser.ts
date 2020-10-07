import getFakerUser from '../../db/factories/user.factory';
import userOauthCreate from '../../logic/oauth/userOauthCreate';
import LoginResponse from '../../graphql/type/LoginResponse';

const getLoggedUser = async (): Promise<LoginResponse> => {
  const user = getFakerUser();
  await user.save();
  const userToken = await userOauthCreate(user.userID);
  return {
    user,
    token: userToken.token,
  };
};

export default getLoggedUser;
