import { getConnection } from 'typeorm';
import { arg, validateClass } from 'validatorjs-decorator/dist';

import UserToken from './UserToken';
import userStatus from '../../userStatus/userStatus.enum';
import UserTokenEnum from './UserTokenEnum';
import User from '../../../db/entities/User';
import Email from '../../../util/email/Email';

@validateClass()
class BasicSignUp {
  private readonly firstName: string;

  private readonly lastName: string;

  private readonly email: string;

  private readonly password: string;

  public constructor(
    @arg('firstName', 'required|string') firstName: string,
    @arg('lastName', 'required|string') lastName: string,
    @arg('email', 'required|email') email: string,
    @arg('password', 'required|min:4|strict_password') password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  async save() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const user = new User();
      user.email = this.email;
      user.firstName = this.firstName;
      user.lastName = this.lastName;
      user.password = this.password;
      user.userStatusID = userStatus.active;
      await user.save();

      const userToken = new UserToken(user.id);
      const link = await userToken.tokenLink(48, UserTokenEnum.ACTIVATE_EMAIL);
      const email = new Email('emails.activateAccount');
      await email.send({ to: this.email }, { name: user.fullName, link });

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
}

export default BasicSignUp;
