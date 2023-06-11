const express = require('express');
const router = express.Router();
const comentarioController  = require('../controllers/comentarioController');
const authController  = require('../controllers/loginController');


router.get('/', comentarioController.getAll);

router.get('/autor', comentarioController.getByAutor);

router.get('/add', (req, res) => {
  res.render('add.twig');
});

router.get('/login', (req, res) => {
  res.render('login.twig');
});

router.post('/remove/:titulo', comentarioController.remove);

router.post('/add', comentarioController.add);

router.post('/login', comentarioController.login);

router.get('/logout', authController.logout);



module.exports = router;
