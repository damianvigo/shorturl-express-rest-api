import jsonwebtoken from 'jsonwebtoken';
import { tokenVerificationErrors } from '../utils/tokenManager.js';

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error('No existe el token');

    /*  const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(payload); */

    const { uid } = jsonwebtoken.verify(
      refreshTokenCookie,
      process.env.JWT_REFRESH
    );
    //console.log(uid);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
