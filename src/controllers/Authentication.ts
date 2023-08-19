import { Request, Response } from 'express';

import { saveUser, findUser } from '../services/user';

let authentication: Authentication | null = null;

class Authentication {
  /**
   * Create user into database
   *
   */
  async register(req: Request, res: Response) {
    try {
      const isExistUsername = await findUser(req.body.username);

      if (isExistUsername) {
        console.log('is Exist username');
        return res.send('error');
      }
      const user = await saveUser(req.body);
      if (user) {
        const { username, password, email } = user;
        res.send({ username, password, email });
      }
    } catch (error) {
      console.error(error);
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
