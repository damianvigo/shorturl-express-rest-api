import { User } from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  try {
    // const user = new User({ email: email, password: password });
    // alternative searching of email
    let user = await User.findOne({ email: email });
    console.log(user);
    if (user) throw { code: 11000 };

    user = new User({ email, password });

    await user.save();

    // Generar el token JWT
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.status(201).json({ token: token, expiresIn: expiresIn });
  } catch (error) {
    console.log(error);
    // aleternative default mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Ya existe este usuario' });
    }
    return res.status(500).json({ error: 'Error de servidor' });
  }

  // res.json({ ok: 'Register' });
};

export const login = async (req, res) => {
  // console.log(req.body);

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    //  if(!user) throw new Error('No existe el usuario registrado')
    if (!user)
      return res.status(403).json({ error: 'No existe el usuario registrado' });

    const respuestaPassword = await user.comparePassword(password);
    // console.log(respuestaPassword);
    if (!respuestaPassword) {
      return res.status(403).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    // const token = jsonwebtoken.sign({ uid: user._id }, process.env.JWT_SECRET)
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    // Token en Cookie
    /* res.cookie('token', token, {
      httpOnly: true,
      secure: !(process.env.MODO === 'developer'),
    }); */

    return res.json({ ok: 'Login', token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user._id });
  } catch (error) {
    return res.status(500).json({ error: 'Error de server' });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de server' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.jon({ ok: true });
};
