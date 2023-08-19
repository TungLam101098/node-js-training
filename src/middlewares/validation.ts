import { plainToClass } from 'class-transformer';
// import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { BaseSchema, ValiError, parse, flatten } from 'valibot';

import HttpException from '../exceptions/Http';

const formatErrorMessages = (errors: Partial<Record<string, [string, ...string[]]>>): string => {
  return Object.entries(errors)
      .map(([field, messages]) => {
        if (!messages) {
          return '';
        }

        return `${field.charAt(0).toUpperCase() + field.slice(1)} field is ${messages.map(message => message.toLowerCase()).join(', ')}`;
      })
      .join(', ');
};


const invalidPathHandler = (request: express.Request, response: express.Response) => {
  response.send({
    code: 404,
    message: 'not found',
  });
};

// function validationMiddleware<T>(type: any): express.RequestHandler {
//   return (req, res, next) => {
//     validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
//       if (errors.length > 0) {
//         const message = errors
//           .map((error: ValidationError) => Object.values(error.constraints as {}))
//           .join(', ');

//         next(new HttpException(400, message));
//       } else {
//         next();
//       }
//     });
//   };
// }

const validationMiddleware = <T>(schema: BaseSchema<T>): express.RequestHandler => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      // Bypass valid params
      parse(schema, req.body);
      next();
    } catch (error) {
      // const { BAD_REQUEST } = MESSAGE.ERROR;

      next(new HttpException(400, formatErrorMessages(flatten(error as ValiError).nested)));
    }
  };
};

export default validationMiddleware;

export { invalidPathHandler };
