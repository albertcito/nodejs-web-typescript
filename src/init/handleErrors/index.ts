import { NextFunction, Response, Request } from 'express';
import { __ } from 'i18n';

import isValidException from 'src/util/exceptions/isValidException';
import notify from '../bugsnag/notify';
import { config } from '../../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (error: Error, req: Request, res: Response, _: NextFunction) => {
  if (isValidException(error)) {
    res.status(200).send(error);
  } else if (config.env === 'production') {
    notify(error, req);
    res.status(500).json({
      status: 'error',
      message: __('error500'),
    });
  } else {
    res.status(500).send({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default handleErrors;
