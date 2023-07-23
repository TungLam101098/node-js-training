import { Router } from 'express';
import user from '../controllers/User';
import validationMiddleware from '../middlewares/validation';
import { UserDto } from '../dto/User';

const router = Router();

router.post('/', validationMiddleware(UserDto), user.login);

export default router;
