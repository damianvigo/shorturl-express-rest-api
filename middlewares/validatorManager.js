import { body } from 'express-validator';
import { validationResult } from 'express-validator';

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

export const bodyLoginValidator = [
  body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Minimo 6 caracteres').trim().isLength({ min: 6 }),
  validationResultExpress,
];
