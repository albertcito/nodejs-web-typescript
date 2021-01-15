import { ReadStream } from 'typeorm/platform/PlatformTools';

const getFileSize = (stream: ReadStream) => new Promise<number>(
  (resolves, rejects) => {
    let filesize = 0;
    stream.on('data', (chunk) => {
      filesize += chunk.length;
    });
    stream.once('end', () => resolves(filesize));
    stream.on('error', rejects);
  },
);

export default getFileSize;
