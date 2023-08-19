import { Request, Response } from 'express';

import MESSAGE from '../constants/message';

interface HttpError {
  status: number;
  message: string;
}

/**
 * @param {Request}
 * @param {Response}
 * Respond to request with status 404 for undefined paths
 */
const invalidPathHandler = (request: Request, response: Response) => {
  const { PATH_NOT_FOUND } = MESSAGE.ERROR;

  response.status(404).send({
    code: PATH_NOT_FOUND.CODE,
    message: PATH_NOT_FOUND.MESSAGE,
  });
};

const invalidDataHandler = (response: Response, error: HttpError) => {
  response.send({
    code: error.status,
    message: error.message,
  });
};

export { invalidPathHandler, invalidDataHandler };
