import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { saveUser, findUser } from '../services/user';
import { invalidDataHandler } from '../middlewares/errors';
import HttpExeption from '../exceptions/Http';
import MESSAGE from '../constants/message';

let authentication: Authentication | null = null;
const SALT_ROUNDS = 10;

class Authentication {
  /**
   * Create user into database
   *
   */
  async register(req: Request, res: Response) {
    const isExistUsername = await findUser(req.body.username);
    const { USER_EXIST } = MESSAGE.ERROR;

    if (isExistUsername) {
      return invalidDataHandler(res, new HttpExeption(USER_EXIST.CODE, USER_EXIST.MESSAGE));
    }

    const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    const user = await saveUser({...req.body, password: hashPassword});

    if (user) {
      const { username, email } = user;
      res.send({ username, email });
    }

  }

  /**
   * Get singleton authentication
   *
   */
  static getAuthentication() {
    if (!authentication) {
      authentication = new Authentication();
    }

    return authentication;
  }
}

export default Authentication.getAuthentication();
