import { Resolver, Query } from 'type-graphql';
import User from '../../../db/entities/User';

@Resolver()
class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }
}

export default UserResolver;
