import ejs from 'ejs';
import { promises as fs } from 'fs';
import path from 'path';

class Render {
  private readonly view: string;

  constructor(view: string) {
    this.view = view;
  }

  async getHtml(params?: { [key: string]: any }): Promise<string> {
    // replaceAll for Typescript doesn't exist yet
    const pathView = this.view.split('.').join('/');
    const templatePath = path.join(__dirname, `../../../src/resources/view/${pathView}.ejs`);
    const template = await fs.readFile(templatePath, 'utf8');
    const html = ejs.render(template, params);
    return html;
  }
}

export default Render;
