const express = require('express');
const router = express.Router();
const addressController  = require('../controllers/comentarioController');

router.get('/', comentarioController.getAll);

router.get('/add', (req, res) => {
  res.render('add.twig');
});

router.post('/remove/:correo', comentarioController.remove);

router.post('/add', comentarioController.add);

module.exports = router;
