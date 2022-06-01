import jsonwebtoken from 'jsonwebtoken';
import { tokenVerificationErrors } from '../utils/tokenManager.js';

export const requireToken = (req, res, next) => {
  try {
    // console.log(req.headers);
    let token = req.headers?.authorization;
    // console.log(token);
    if (!token) throw new Error('No existe el token en el header usa Bearer');

    //
    /*   token = token.split(' ');
      console.log(token); */
    token = token.split(' ')[1];
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    // console.log(payload);

    req.uid = payload.uid;

    next();
  } catch (error) {
    console.log(error.message);

    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });

    //  return res.status(401).json({ error: error.message });
  }
};

/* export const requireToken = (req, res, next) => {
    //Con cookies
  try {
    // console.log(req.headers);
    let token = req.cookies.token;
    // console.log(token);
    if (!token) throw new Error('No existe el token en el header usa Bearer');

    //
    //  token = token.split(' ');
    // console.log(token);
    // token = token.split(' ')[1];
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    req.uid = payload.uid;

    next();
  } catch (error) {
    console.log(error.message);

    const TokenVerificationErrors = {
      ['invalid signature']: 'La firma del JWT no es valida',
      ['jwt expired']: 'JWT expirado',
      ['invalid token']: 'Token no válido',
      ['No Bearer']: 'Utiliza formato Bearer',
      ['jwt malformed']: 'JWT formato no valido',
    };

    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });

    //  return res.status(401).json({ error: error.message });
  }
}; */
