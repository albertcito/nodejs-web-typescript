import { NextFunction, Response, Request } from 'express';
// eslint-disable-next-line no-unused-vars
const handleErrors = (_err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'We are working in this issue ... etc. bla bla bla xD',
  });
};

export default handleErrors;
