import { Express } from 'express-serve-static-core';
import loginRoute from './login';

const route = (app: Express) => {
  app.use('/login', loginRoute);
};

export default route;
