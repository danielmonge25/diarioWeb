const User = require('../models/user');
const Comentario = require('../models/comentario');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      req.session.user = user;
      const comentarios = await Comentario.findAll({
        attributes: ['Fecha', 'Texto', 'Autor', 'Comentarios', 'Titulo']
      });
      res.render('comentarios.twig', { user, comentarios }); 
    } else {
      res.render('login.twig', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error occurred during login' });
  }
};

const logout = (req, res) => {
  req.session.user = null;

  res.redirect('/login');
};

module.exports = { login, logout };
