import { User } from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';

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

    return res.status(201).json({ ok: true });
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
  console.log(req.body);

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
    const token = jsonwebtoken.sign({ uid: user._id }, process.env.JWT_SECRET);

    return res.json({ ok: 'Login', token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
};
