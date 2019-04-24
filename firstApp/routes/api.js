import { Router } from 'express';

const router = Router();

/**
 * api index
 */
router.get('/', (req, res) => {
  res.json({ 'message': 'Ping Successfull' });
});

export default router;