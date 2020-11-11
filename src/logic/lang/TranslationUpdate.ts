import Translation from '~src/db/entities/Translation';
import Text from '~src/db/entities/Text';
import TextInputUpdate from '~src/graphql/input/TextInputUpdate';

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
    await this.saveTranslation(options);
    await this.saveTexts();
    return this.translation;
  }

  private async saveTranslation(options: TranslationUpdateSave) {
    const { code, isBlocked } = options;
    if (code) {
      this.translation.code = code;
    }
    if (isBlocked) {
      this.translation.isBlocked = isBlocked;
    }
    await this.translation.save();
  }

  private async saveTexts() {
    const textPromises = [];
    for (let i = 0; i < this.texts.length; i += 1) {
      const text = this.texts[i];
      textPromises.push(this.saveText(text));
    }
    await Promise.all(textPromises);
  }

  private async saveText(text: TextInputUpdate) {
    const textEntity = await Text.findOne({
      where: {
        translationID: this.translation.translationID,
        langID: text.langID,
      },
    });
    if (textEntity) {
      textEntity.text = text.text;
      await textEntity.save();
    } else {
      const newText = new Text();
      newText.text = text.text;
      newText.langID = text.langID;
      newText.translationID = this.translation.translationID;
      await newText.save();
    }
  }
}
