import { InputType, Field } from 'type-graphql';

@InputType()
export class LangInput {
  @Field()
  langID: string;

  @Field()
  name: string;

  @Field()
  localname: string;

  @Field({ nullable: true })
  active: boolean;

  @Field({ nullable: true })
  isBlocked: boolean;
}

export const rules = {
  langID: 'required|string|unique:public.lang,lang_id',
  name: 'required|string',
  localname: 'required|string',
  active: 'boolean',
  isBlocked: 'boolean',
};
