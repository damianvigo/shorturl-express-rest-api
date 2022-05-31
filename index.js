import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);

/* app.get('/', (req, res) => {
    res.json({ ok: true });
}); */
// example login/token
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server online 🔥 http://localhost:' + PORT);
});
