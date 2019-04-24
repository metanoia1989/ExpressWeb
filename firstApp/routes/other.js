import { Router } from 'express';

const router = Router();

/**
 * other router
 */

router.use((req, res, next) => {
  console.log('Access other router time: ', Date.now());
  next();
});


router.get('/another', (req, res, next) => {
  console.log('Request URL: ', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Reqeust Type: ', req.method);
  next();
}, (req, res) => {
  res.json({ 'msg': '去看看控制台有什么信息' });
});

router.get('/:title', (req, res) => {
  res.json({ 'title': req.params.title });
});


export default router;