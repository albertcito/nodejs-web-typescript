import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';

import { config } from '../../config';

Bugsnag.start({
  apiKey: config.bugsbag,
  plugins: [BugsnagPluginExpress],
  releaseStage: config.env,
  appVersion: config.versionCode,
  enabledReleaseStages: ['production'],
  logger: null,
});
