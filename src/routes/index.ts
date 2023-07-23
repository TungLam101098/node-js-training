import { Express } from 'express-serve-static-core';
import loginRoute from './login';
import registerRoute from './register';

const route = (app: Express) => {
  app.use('/login', loginRoute);
  app.use('/register', registerRoute);
};

export default route;
