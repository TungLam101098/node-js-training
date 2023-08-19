import { Request, Response } from 'express';

import MESSAGE from '../constants/message';
import HttpException from '../exceptions/Http';


/**
 * @param {Request}
 * @param {Response}
 * Respond to request with status 404 for undefined paths
 */
const invalidPathHandler = (request: Request, response: Response) => {
  const { PATH_NOT_FOUND } = MESSAGE.ERROR;

  invalidDataHandler(response, new HttpException(404, PATH_NOT_FOUND.MESSAGE));
};

const invalidDataHandler = (response: Response, error: HttpException) => {
  const { INTERNAL_SERVER } = MESSAGE.ERROR;
  const status = error.status || INTERNAL_SERVER.CODE;
  const message = error.message || INTERNAL_SERVER.MESSAGE;

  response.status(error.status).send({
    code: status,
    message,
  });
};

export { invalidPathHandler, invalidDataHandler };
