import { RequestHandler, Request, Response, NextFunction } from 'express';
import { BaseSchema, ValiError, parse, flatten } from 'valibot';

import { formatErrorMessages } from '../utils/string';

const validationMiddleware = <T>(schema: BaseSchema<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Bypass valid params
      parse(schema, req.body);
      next();
    } catch (error) {
      const status = 400;

      res.status(status).send({
        status,
        message: formatErrorMessages(flatten(error as ValiError).nested),
      });
    }
  };
};

export default validationMiddleware;
