const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const Twig = require('twig');
const sequelize = require('./config/database');
const comentarioRoutes = require('./routes/comentarios');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('twig', Twig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

const Comentario = require('./models/comentarios');

app.use('/', comentarioRoutes);

sequelize
  .authenticate()
  .then(() => {
    //console.log('Servidor iniciado en http://localhost:3000');
  })
  .catch((error) => {
    console.error('Error al iniciar la aplicacion:', error);
  });

module.exports = app; 
