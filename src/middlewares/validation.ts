import { RequestHandler, Request, Response, NextFunction } from 'express';
import { BaseSchema, ValiError, parse, flatten } from 'valibot';

import { formatErrorMessages } from '../utils/string';
import { invalidDataHandler } from './errors';
import MESSAGE from '../constants/message';
import HttpException from '../exceptions/Http';

const validationMiddleware = <T>(schema: BaseSchema<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Bypass valid params
      parse(schema, req.body);
      next();
    } catch (error) {
      const { BAD_REQUEST } = MESSAGE.ERROR;

      invalidDataHandler(res, new HttpException(BAD_REQUEST.CODE, formatErrorMessages(flatten(error as ValiError).nested)));
    }
  };
};

export default validationMiddleware;
