import { FileUpload } from 'graphql-upload';
import FileType from 'file-type';

import MessageError from '../exceptions/MessageError';

const getExtension = async (file: FileUpload) => {
  const type = await FileType.stream(file.createReadStream());
  if (!type.fileType) {
    throw new MessageError(`Extension "${file.filename}" not determined by the server`);
  }
  return type.fileType.ext;
};

export default getExtension;
