import { NextFunction, Response, Request } from 'express';
import notify from '../bugsnag/notify';
import { config } from '../../config';
import isValidException from '../../util/exceptions/isValidException';

// eslint-disable-next-line no-unused-vars
const handleErrors = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (isValidException(error)) {
    res.status(200).send(error);
  } else if (config.env === 'production') {
    notify(error, req);
    res.status(500).json({
      status: 'error',
      message: 'We are working in this issue ... etc. bla bla bla xD',
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
