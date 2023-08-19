import { Router } from 'express';

import Authentication from '../controllers/Authentication';
import { userLoginSchema } from '../schemas/user';
import validation from '../middlewares/validation';

const router = Router();

// TODO: Handle register API
router.post('/', validation(userLoginSchema), Authentication.login);

export default router;
