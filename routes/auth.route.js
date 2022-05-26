import express from 'express';
const router = express.Router();
console.log(router);

router.get('/login', (req, res) => {
  res.json({ ok: true });
});

router.post('/register', (req, res) => {
  res.json({ ok: true });
});

export default router;
