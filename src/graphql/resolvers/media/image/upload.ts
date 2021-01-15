import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import Image from 'src/db/entities/Media/Image';
import ImageUpload from 'src/logic/media/ImageUpload';
import imagesAllowed from 'src/logic/media/imagesAllowed';

@Resolver()
export default class UploadImageResolver {
  @Mutation(() => Image)
  async uploadImage(
    @Arg(
      'file', () => GraphQLUpload,
      { description: `Images allowed ${imagesAllowed.join(', ')}` },
    ) file: FileUpload,
  ): Promise<Image> {
    return (new ImageUpload(file)).upload();
  }
}
