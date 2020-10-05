import { ObjectType, Field } from 'type-graphql';
import ErrorResponse from '../../util/graphql/ErrorsResponse';
import Lang from '../../db/entities/Lang';

@ObjectType()
class LangResponse extends ErrorResponse {
  @Field(() => Lang, { nullable: true })
  lang?: Lang;
}

export default LangResponse;
