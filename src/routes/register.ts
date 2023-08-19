import { Router } from 'express';

import Authentication from '../controllers/Authentication';
import { userSchema } from '../schemas/user';
import validation from '../middlewares/validation';

const router = Router();

// TODO: Handle register API
router.post('/', validation(userSchema), Authentication.register);

export default router;
