import TextsUpdate from './TextsUpdate';

import Translation from '~src/db/entities/Translation';
import TextInputCreate from '~src/graphql/input/TextInputCreate';

interface TranslationUpdateSave {
  code?: string;
  isBlocked?: boolean;
}

export default class TranslationUpdate {
  private readonly texts: TextInputCreate[];

  private readonly translation: Translation;

  public constructor(translation: Translation, texts: TextInputCreate[]) {
    this.translation = translation;
    this.texts = texts;
  }

  async save(options: TranslationUpdateSave): Promise<Translation> {
    await this.updateTranslation(options);
    await (new TextsUpdate(this.translation.translationID)).save(this.texts);
    return this.translation;
  }

  private async updateTranslation(options: TranslationUpdateSave) {
    const { code, isBlocked } = options;
    if (code) {
      this.translation.code = code;
    }
    if (isBlocked) {
      this.translation.isBlocked = isBlocked;
    }
    await this.translation.save();
  }
}
