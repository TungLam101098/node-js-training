import { Router } from 'express';
import user from '../controllers/User';

const router = Router();

router.post('/', user.login);

export default router;
