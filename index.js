import 'dotenv/config';
import './database/connectdb.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
import redirectRouter from './routes/redirect.route.js';

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

// no entran al controlador
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback('Error de CORS origin: ' + origin + ' No autorizado');
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/', redirectRouter); // example back redirect (opcional)
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
