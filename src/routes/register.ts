import { Router } from 'express';
import user from '../controllers/User';
import validationMiddleware from '../middlewares/validation';
import { UserDto } from '../dto/user';

const router = Router();

router.post('/', validationMiddleware(UserDto), user.register);

export default router;
