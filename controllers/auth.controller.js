import { User } from '../models/User.js';

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

    //jwt token

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

export const login = (req, res) => {
  console.log(req.body);
  res.json({ ok: 'Login' });
};
