import Text from '../../db/entities/Text';
import TextInputCreate from '../../graphql/input/TextInputCreate';

export default class TextsCreate {
  private readonly id: number;

  constructor(id: number) {
    this.id = id;
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
    textEntity.translationID = this.id;
    await textEntity.save();
  }
}
