import { Router } from 'express';
import auth from '../controllers/User';

const router = Router();

router.post('/', auth.register);

export default router;
