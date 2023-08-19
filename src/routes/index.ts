import { Express } from 'express-serve-static-core';

import registerRoute from './register';
import loginRoute from './login';

const route = (app: Express) => {
  app.use('/api/register', registerRoute);
  app.use('/api/login', loginRoute);
};

export default route;
