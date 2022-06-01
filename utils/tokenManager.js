import jsonwebtoken from 'jsonwebtoken';

export const generateToken = (uid) => {
  const expiresIn = 60 * 15;

  try {
    const token = jsonwebtoken.sign({ uid: uid }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });

    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jsonwebtoken.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === 'developer'),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

/* export const errorsValidateToken = (error) => {
  switch (error) {
    case 'invalid signature':
      return 'Firma no valida';
    case 'jwt expired':
      return 'Token expirado';
    case 'invalid token':
      return 'No invente token';
    default:
      return error;
  }
};
 */
