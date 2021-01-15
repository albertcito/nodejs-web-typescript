import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

import Image from 'src/db/entities/Media/Image';
import getExtension from 'src/util/files/getExtension';
import getFileSize from 'src/util/files/getFileSize';

const getBuffer = (file: FileUpload) => {
  const stream = file.createReadStream();
  return new Promise<Buffer>((resolve, reject) => {
    const buffers: Buffer[] = [];
    stream.on('error', (error) => reject(error));
    stream.on('data', (data: Buffer) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
};

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
    image.ext = await getExtension(file);
    image.size = await getFileSize(stream);

    const imageBuffer = await getBuffer(file);
    const imageSharp = sharp(imageBuffer);
    const metadata = await imageSharp.metadata();
    image.width = metadata.width;
    image.height = metadata.height;
    await imageSharp.toFile(`uploads/images/${image.fileName()}`);
    await image.save();
    return image;
  }
}
