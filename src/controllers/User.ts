import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserModel from '../models/User';
import HttpException from '../exceptions/Http';

const saltRounds = 10;

class User {
  // Register user
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address || '',
      };
      const existUsername = await UserModel.findOne({ username: user.username }).exec();
      if (existUsername) {
        return next(new HttpException(401, 'User already exists'));
      }
      const hash = bcrypt.hashSync(user.password, saltRounds);
      await UserModel.create({ ...user, password: hash });

      res.send(`Register successfully`);
    } catch (error) {
      console.log(error)
      next();
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRequest = {
        username: req.body.username,
        password: req.body.password,
      };
      const user = await UserModel.findOne({ username: userRequest.username }).exec();
      if (!user) {
        return next(new HttpException(401, 'Account no exist'));
      }
      
      const isValidPassword = bcrypt.compareSync(userRequest.password, user.password);
      if (!isValidPassword) {
        return next(new HttpException(401, 'Password invalid'));
      }

      res.send('Login successfully');
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
