const express = require('express');
const router = express.Router();
const comentarioController  = require('../controllers/comentarioController');

router.get('/', comentarioController.getAll);

router.get('/add', (req, res) => {
  res.render('add.twig');
});

router.post('/remove/:titulo', comentarioController.remove);

router.post('/add', comentarioController.add);

router.post('/login', comentarioController.login);


module.exports = router;
