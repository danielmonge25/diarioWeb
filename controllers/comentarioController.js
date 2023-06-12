const Comentario = require('../models/comentario');
const authController = require('../controllers/loginController');

const getAll = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 5;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  try {
    const totalCount = await Comentario.count();
    const totalPages = Math.ceil(totalCount / size);

    const comentarios = await Comentario.findAll({
      limit: size,
      offset: page * size,
      attributes: ['Fecha', 'Texto', 'Autor', 'Comentarios', 'Titulo'],
    });

    res.render('comentarios.twig', { comentarios, page, size, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};

const getByAutor = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const autor = req.query.autor;

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 5;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  try {
    const comentarios = await Comentario.findAll({
      limit: size,
      offset: page * size,
      where: {
        Autor: autor,
      },
      attributes: ['Fecha', 'Texto', 'Autor', 'Comentarios', 'Titulo'],
    });
    res.render('comentarios.twig', { comentarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};


const add = async (req, res) => {
  try {
    const nuevoComentario = {
      Fecha: req.body.Fecha,
      Texto: req.body.Texto,
      Autor: req.body.Autor,
      Comentarios: req.body.Comentarios,
      Titulo: req.body.Titulo
    };

    await Comentario.create(nuevoComentario);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

const remove = async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.titulo);
    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    await comentario.destroy();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el comentario' });
  }
};

const login = (req, res) => {
  res.render('login.twig');
};

module.exports = {
  getAll,
  getByAutor,
  add,
  remove,
  login: authController.login 
};

