// import { v4 as uuidv4 } from 'uuid';

import Translation from '~src/db/entities/Translation';
import Text from '~src/db/entities/Text';
import TextInputCreate from '~src/graphql/input/TextInputCreate';

interface TranslationCreateSave {
  code?: string;
  isBlocked?: boolean;
}

export default class TranslationCreate {
  private texts: TextInputCreate[];

  public constructor(texts: TextInputCreate[]) {
    this.texts = texts;
  }

  async save(options: TranslationCreateSave): Promise<Translation> {
    const { code, isBlocked = false } = options;
    const translation = new Translation();
    translation.code = code ?? 'uuidv4()';
    translation.isBlocked = isBlocked;
    await translation.save();

    this.texts.forEach(async (text) => {
      const textEntity = new Text();
      textEntity.text = text.text;
      textEntity.langID = text.langID;
      textEntity.translationID = translation.translationID;
      await textEntity.save();
    });

    return translation;
  }
}
