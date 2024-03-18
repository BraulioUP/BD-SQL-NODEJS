const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa el modelo de la base de datos
const User = require("../models/Users")(sequelize, Sequelize);
const Regiones = require("../models/Regiones")(sequelize, Sequelize);
const Idiomas = require("../models/Idiomas")(sequelize, Sequelize);
const Vehiculo = require("../models/Vehiculo")(sequelize, Sequelize);

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);

passport.use(new LocalStrategy(
  function(Nombre, ContrasenaHash, done) {
    User.findOne({ Nombre: Nombre }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      if (!user.validPassword(ContrasenaHash)) { 
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.UsuarioId);
});

passport.deserializeUser(function(UsuarioId, done) {
  User.findById(UsuarioId, function(err, user) {
    done(err, user);
  });
});