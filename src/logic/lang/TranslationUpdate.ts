import { __ } from 'i18n';

import Translation from '~src/db/entities/Translation';
import Text from '~src/db/entities/Text';
import TextInputUpdate from '~src/graphql/input/TextInputUpdate';
import MessageError from '~src/util/exceptions/MessageError';

interface TranslationUpdateSave {
  code?: string;
  isBlocked?: boolean;
}

export default class TranslationUpdate {
  private readonly texts: TextInputUpdate[];

  private readonly translation: Translation;

  public constructor(translation: Translation, texts: TextInputUpdate[]) {
    this.translation = translation;
    this.texts = texts;
  }

  async save(options: TranslationUpdateSave): Promise<Translation> {
    const { code, isBlocked } = options;
    if (code) {
      this.translation.code = code;
    }
    if (isBlocked) {
      this.translation.isBlocked = isBlocked;
    }
    await this.translation.save();

    this.texts.forEach(async (text) => {
      if (text.textID) {
        const textEntity = await Text.findOne(text.textID);
        if (!textEntity) {
          throw new MessageError(__('The item %s does not exists', `${text.textID}`));
        }
      } else {
        const textEntity = new Text();
        textEntity.text = text.text;
        textEntity.langID = text.langID;
        textEntity.translationID = this.translation.translationID;
        await textEntity.save();
      }
    });

    return this.translation;
  }
}
