import { Express } from 'express-serve-static-core';
import registerRoute from './register';

const route = (app: Express) => {
  app.use('/register', registerRoute);
};

export default route;
