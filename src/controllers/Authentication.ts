import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { saveUser, findUser } from '../services/user';
import { invalidDataHandler } from '../middlewares/errors';
import HttpException from '../exceptions/Http';
import MESSAGE from '../constants/message';

let authentication: Authentication | null = null;
const SALT_ROUNDS = 10;

class Authentication {
  /**
   * Create user into database
   *
   */
  async register(req: Request, res: Response) {
    const isExistUsername = !!await findUser(req.body.username);
    const { USER_EXIST } = MESSAGE.ERROR;

    if (isExistUsername) {
      return invalidDataHandler(res, new HttpException(USER_EXIST.CODE, USER_EXIST.MESSAGE));
    }

    const { username, password, email } = req.body;
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // Save user to database
    const user = await saveUser({
      username, password: hashPassword, email
    });

    if (user) {
      const { username, email } = user;
      res.send({ username, email });
    }

  }
  /**
   * Login into the app
   *
   */
  async login(req: Request, res: Response) {
    const user = await findUser(req.body.username);
    const { USER_NOT_FOUND, INVALID_PASSWORD } = MESSAGE.ERROR;

    if (!user) {
      return invalidDataHandler(res, new HttpException(USER_NOT_FOUND.CODE, USER_NOT_FOUND.MESSAGE));
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      return invalidDataHandler(res, new HttpException(INVALID_PASSWORD.CODE, INVALID_PASSWORD.MESSAGE));
    }

    const { username, email } = user;
    res.send({ username, email });

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
