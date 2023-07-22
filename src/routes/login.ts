import { Router } from 'express';
const router = Router();

router.post('/', (req, res) => {
  res.send('Login successfully');
});

export default router;
