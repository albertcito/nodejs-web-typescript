import Text from '~src/db/entities/Text';
import TextInputCreate from '~src/graphql/input/TextInputCreate';

export default class SaveTexts {
  private readonly id: number;

  constructor(id: number) {
    this.id = id;
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
    textEntity.translationID = this.id;
    await textEntity.save();
  }
}
