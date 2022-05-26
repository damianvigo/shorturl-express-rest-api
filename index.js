import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRoutes from './routes/auth.route.js';

const app = express();

app.use('/', authRoutes);

/* app.get('/', (req, res) => {
  res.json({ ok: true });
}); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server online 🔥 http://localhost:' + PORT);
});
