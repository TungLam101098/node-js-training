import { Router } from 'express';
import auth from '../controllers/User';
import validationMiddleware from '../middlewares/validation';
import { UserDto } from '../dto/user';

const router = Router();

router.post('/', validationMiddleware(UserDto), auth.register);

export default router;
