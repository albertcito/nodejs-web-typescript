import { v4 as uuidv4 } from 'uuid';

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

  async save(options: TranslationCreateSave = {}): Promise<Translation> {
    const translation = await this.saveTranslation(options);
    await this.saveTexts(translation.translationID);
    return translation;
  }

  private async saveTranslation(options: TranslationCreateSave) {
    const { code, isBlocked = false } = options;
    const translation = new Translation();
    translation.code = code ?? uuidv4();
    translation.isBlocked = isBlocked;
    await translation.save();
    return translation;
  }

  private async saveTexts(translationID: number) {
    const textPromises = [];
    for (let i = 0; i < this.texts.length; i += 1) {
      const text = this.texts[i];
      textPromises.push(this.saveText(translationID, text));
    }
    await Promise.all(textPromises);
  }

  private async saveText(translationID: number, text: TextInputCreate) {
    const textEntity = new Text();
    textEntity.text = text.text;
    textEntity.langID = text.langID;
    textEntity.translationID = translationID;
    await textEntity.save();
  }
}
