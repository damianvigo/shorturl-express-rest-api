import jsonwebtoken from 'jsonwebtoken';

export const generateToken = (uid) => {
  const expiresIn = 60 * 15;

  try {
    const token = jsonwebtoken.sign({ uid: uid }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });

    return { token, expiresIn };
  } catch (error) {}
};
