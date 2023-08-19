import { Router } from 'express';
import { email, minLength, object, string } from 'valibot';

import user from '../controllers/User';
import validationMiddleware from '../middlewares/validation';

const router = Router();
const userSchema = object({
  username: string([minLength(4)]),
  password: string([minLength(4)]),
  email: string([email()]),
});

router.post('/', validationMiddleware(userSchema), user.register);

export default router;
