const { Sequelize } = require("sequelize");
const sequelize = require("./database");

const express = require("express");
const router = express.Router();

// Importa el modelo de la base de datos
const User = require("./Users")(sequelize, Sequelize);
const Regiones = require("./Regiones")(sequelize, Sequelize);
const Idiomas = require("./Idiomas")(sequelize, Sequelize);

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);

router.get("/api/users", async (req, res) => {
  try {
    const usuarios = await User.findAll({
      include: [User.associations.Region, User.associations.Idioma],
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Ocurrió un error al obtener los usuarios");
  }
});

module.exports = router;
