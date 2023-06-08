const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comentario = sequelize.define('Comentario', {
  Fecha: DataTypes.STRING,
  Texto: DataTypes.STRING,
  Autor: DataTypes.STRING,
  Comentarios: DataTypes.STRING,
  Titulo: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports = Comentario;


