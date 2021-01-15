import {
  Field, ObjectType, Int,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

import { appURL } from 'src/config';
import BaseEntity from '../BaseEntity';

@ObjectType()
@Entity({ name: 'image', schema: 'media' })
export default class Image extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'title_id' })
  titleID?: number;

  @Field(() => String)
  @Column()
  name: string;

  @Column()
  path: string;

  url() {
    return `${appURL}/${this.path}/${this.fileName()}`;
  }

  fileName() {
    return `${this.id}.${this.ext}`;
  }

  @Field(() => String)
  @Column()
  ext: string;

  @Field(() => String)
  @Column()
  mime?: string;

  @Field(() => Int)
  @Column()
  size?: number;

  @Field(() => Int)
  @Column()
  width?: number;

  @Field(() => Int)
  @Column()
  height?: number;
}
