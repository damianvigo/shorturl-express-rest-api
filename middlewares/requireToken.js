import jsonwebtoken from 'jsonwebtoken';

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
    console.log(payload);

    req.uid = payload.uid;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
