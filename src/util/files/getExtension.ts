import { FileUpload } from 'graphql-upload';
import FileType from 'file-type';

const getExtension = async (file: FileUpload) => {
  const type = await FileType.stream(file.createReadStream());
  if (type.fileType?.ext) {
    return type.fileType.ext;
  }
  const re = /(?:\.([^.]+))?$/.exec(file.filename);
  if (!re || !re[1]) {
    throw new Error(`Imposible to determine file extension "${file.filename}"`);
  }
  return re[1];
};

export default getExtension;
