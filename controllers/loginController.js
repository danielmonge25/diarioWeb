const User = require('../models/user');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      req.session.user = user; 
      res.redirect('/');
    } else {
      res.render('login.twig', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error occurred during login' });
  }
};

module.exports = { login };
