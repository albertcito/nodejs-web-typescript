import { getManager } from 'typeorm';
import { arg } from 'validatorjs-decorator/dist';
import User from '../../db/entities/User';
import Email from '../../util/email/Email';

const { tablePath } = getManager().getRepository(User).metadata;

class BasicSignUp {
  private readonly firstName: string;

  private readonly lastName: string;

  private readonly email: string;

  private readonly password: string;

  public constructor(
    @arg('firstName', 'required|string') firstName: string,
    @arg('lastName', 'required|string') lastName: string,
    @arg('email', `required|email|unique:${tablePath},email`) email: string,
    @arg('password', 'required|min:4|strict_password') password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  async save() {
    const email = new Email('emails.activateAccount');
    await email.send({ to: this.email });

    const user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.password = this.password;
    await user.save();
    return user;
  }
}

export default BasicSignUp;
