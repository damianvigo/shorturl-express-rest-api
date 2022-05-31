import { Router } from 'express';
import { infoUser, login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';
const router = Router();

router.post(
  '/register',
  [
    body('email', 'Formato de email incorrecto')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Minimo 6 caracteres').trim().isLength({ min: 6 }),
    body('password', 'Formato de password incorrecta').custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          // value de password
          throw new Error('No coinciden las contraseñas');
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);

router.post(
  '/login',
  [
    body('email', 'Formato de email incorrecto')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Minimo 6 caracteres').trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.get('/protected', requireToken, infoUser);

export default router;
