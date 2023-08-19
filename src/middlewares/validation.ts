import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/Http';

const invalidPathHandler = (request: express.Request, response: express.Response) => {
  response.send({
    code: 404,
    message: 'not found',
  });
};

function validationMiddleware<T>(type: any): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints as {}))
          .join(', ');

        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;

export { invalidPathHandler };
