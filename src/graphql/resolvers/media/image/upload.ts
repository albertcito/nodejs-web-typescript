import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import Image from 'src/db/entities/Media/Image';
import ImageUpload from 'src/logic/media/ImageUpload';

@Resolver()
export default class UploadImageResolver {
  @Mutation(() => Image)
  async uploadImage(@Arg('file', () => GraphQLUpload) file: FileUpload): Promise<Image> {
    return (new ImageUpload(file)).upload();
  }
}
