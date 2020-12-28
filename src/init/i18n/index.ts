/* eslint-disable no-console */
import i18n from 'i18n';
import path from 'path';

import { config } from 'src/config';

const configure: i18n.ConfigurationOptions = {
  defaultLocale: 'en',
  locales: ['en'],
  directory: path.join(__dirname, '../../resources/langs'),
};

if (config.env === 'development') {
  configure.logErrorFn = (msg: string) => console.log('error', msg);
  configure.updateFiles = true;
}

i18n.configure(configure);
