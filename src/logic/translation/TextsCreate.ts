import Text from '../../db/entities/Text';
import TextInputCreate from '../../graphql/input/TextInputCreate';

export default class TextsCreate {
  private readonly translationID: number;

  constructor(translationID: number) {
    this.translationID = translationID;
  }

  async save(texts: TextInputCreate[]) {
    const textsPromises = [];
    for (let i = 0; i < texts.length; i += 1) {
      const text = texts[i];
      textsPromises.push(this.saveText(text));
    }
    await Promise.all(textsPromises);
  }

  private async saveText(text: TextInputCreate) {
    const textEntity = new Text();
    textEntity.text = text.text;
    textEntity.langID = text.langID;
    textEntity.translationID = this.translationID;
    await textEntity.save();
  }
}
