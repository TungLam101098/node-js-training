import { Express } from 'express-serve-static-core';
import loginRoute from './login';
import registerRoute from './register';
import usersRoute from './users';

const route = (app: Express) => {
  app.use('/login', loginRoute);
  app.use('/register', registerRoute);
  app.use('/users', usersRoute);
};

export default route;
