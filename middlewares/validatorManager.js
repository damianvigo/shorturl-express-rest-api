import axios from 'axios';
import { body, param, validationResult } from 'express-validator';

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  // console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyRegisterValidator = [
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
  validationResultExpress,
];

export const paramLinkValidator = [
  param('id', 'Formato no valido (expressValidator').trim().notEmpty().escape(),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body('longLink', 'formato link incorrecto')
    .trim()
    .notEmpty()
    .custom(async (value) => {
      // value de longLink
      try {
        if (!value.startsWith('https://')) {
          value = 'https://' + value;
        }

        await axios.get(value);
        return value;
      } catch (error) {
        // console.log(error);
        throw new Error('not found longlink 404');
      }
    }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Minimo 6 caracteres').trim().isLength({ min: 6 }),
  validationResultExpress,
];
