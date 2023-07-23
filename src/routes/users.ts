import { Router } from 'express';
import user from '../controllers/User';

const router = Router();

router.get('/', user.getUsers);

export default router;
