import { BuildSchemaOptions } from 'type-graphql';
import path from 'path';

const apolloScheme: BuildSchemaOptions = {
  resolvers: [path.join(__dirname, '../resolvers/**/*.ts')],
  validate: false,
};

export default apolloScheme;
