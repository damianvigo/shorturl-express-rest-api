import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.listen(5000, () => {
  console.log('server online 🔥 http://localhost:5000');
});
