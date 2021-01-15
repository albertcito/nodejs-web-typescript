import { FileUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

import Image from 'src/db/entities/Media/Image';
import getExtension from 'src/util/files/getExtension';
import getFileSize from 'src/util/files/getFileSize';

export default class ImageUpload {
  private readonly file: FileUpload;

  private readonly path = 'uploads/images/';

  constructor(file: FileUpload) {
    this.file = file;
  }

  async upload() {
    const stream = this.file.createReadStream();
    const image = new Image();
    image.name = this.file.filename;
    image.mime = this.file.mimetype;
    image.path = this.path;
    image.slug = uuidv4();
    image.ext = await getExtension(this.file);
    image.size = await getFileSize(stream);

    const imageBuffer = await this.getBuffer();
    const imageSharp = sharp(imageBuffer);
    const metadata = await imageSharp.metadata();
    image.width = metadata.width;
    image.height = metadata.height;
    await image.save();
    try {
      await imageSharp.toFile(`${this.path}${image.id}.${image.ext}`);
    } catch (error) {
      image.remove();
      throw error;
    }
    return image;
  }

  private getBuffer() {
    const stream = this.file.createReadStream();
    return new Promise<Buffer>((resolve, reject) => {
      const buffers: Buffer[] = [];
      stream.on('error', (error) => reject(error));
      stream.on('data', (data: Buffer) => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }
}
