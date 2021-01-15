import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';

import Image from 'src/db/entities/Media/Image';
import getExtension from 'src/util/files/getExtension';
import getFileSize from 'src/util/files/getFileSize';
import upload from 'src/util/files/upload';

@Resolver()
export default class UploadImageResolver {
  @Mutation(() => Image)
  async uploadImage(
      @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<Image> {
    const stream = file.createReadStream();
    const image = new Image();
    image.name = file.filename;
    image.path = 'uploads/images';
    image.mime = file.mimetype;
    image.slug = uuidv4();
    image.width = 0;
    image.height = 0;
    image.ext = await getExtension(file);
    image.size = await getFileSize(stream);

    await upload(stream, image.fileName());
    await image.save();
    return image;
  }
}
