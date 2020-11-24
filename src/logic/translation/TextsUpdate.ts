import Text from '../../db/entities/Text';
import TextInputCreate from '../../graphql/input/TextInputCreate';

export default class TextsUpdate {
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
    const textEntity = await Text.findOne({
      where: {
        translationID: this.id,
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
      newText.translationID = this.id;
      await newText.save();
    }
  }
}
