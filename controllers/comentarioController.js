const Comentario = require('../models/comentario');

const getAll = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll({
      attributes: ['Fecha', 'Texto', 'Autor', 'Comentarios', 'DireccionTrabajo', 'Titulo']
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
    const comentario = await Comentario.findByPk(req.params.Titulo);
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

module.exports = {
  getAll,
  add,
  remove
};

