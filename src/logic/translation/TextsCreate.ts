import Text from '~src/db/entities/Text';
import TextInputCreate from '~src/graphql/input/TextInputCreate';

export default class SaveTexts {
  private readonly translationID: number;

  constructor(translationID: number) {
    this.translationID = translationID;
  }

  async save(texts: TextInputCreate[]) {
    const textPromises = [];
    for (let i = 0; i < texts.length; i += 1) {
      const text = texts[i];
      textPromises.push(this.saveText(text));
    }
    await Promise.all(textPromises);
  }

  private async saveText(text: TextInputCreate) {
    const textEntity = new Text();
    textEntity.text = text.text;
    textEntity.langID = text.langID;
    textEntity.translationID = this.translationID;
    await textEntity.save();
  }
}
