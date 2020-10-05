import { BuildSchemaOptions } from 'type-graphql';
import path from 'path';

const apolloScheme: BuildSchemaOptions = {
  resolvers: [path.join(__dirname, '../../graphql/**/*.ts')],
  validate: false,
};

export default apolloScheme;
