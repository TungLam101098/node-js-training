import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/User';

class User {
  // Register user
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = {
        userName: req.body.userName,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address || '',
      };
      await UserModel.create(user);

      res.send(`Register successfully ${user.userName}`);
    } catch (error) {
      next();
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.find({});
      res.send({ data: users });
    } catch (error) {
      next();
    }
  };
}

export default new User();
