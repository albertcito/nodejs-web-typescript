import { createWriteStream } from 'fs';
import { ReadStream } from 'typeorm/platform/PlatformTools';

const upload = (stream: ReadStream, fileName: string) => {
  const writableStream = createWriteStream(
    `${__dirname}/../../uploads/images/${fileName}`,
    { autoClose: true },
  );
  return new Promise((res, rej) => {
    stream.pipe(writableStream)
      .on('finish', () => res(true))
      .on('error', (err) => rej(err));
  });
};

export default upload;
