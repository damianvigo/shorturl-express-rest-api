import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import linkRouter from './routes/link.route.js';
import redirectRouter from './routes/redirect.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', redirectRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/links', linkRouter);

/* app.get('/', (req, res) => {
    res.json({ ok: true });
}); */
// example login/token
// app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server online 🔥 http://localhost:' + PORT);
});
