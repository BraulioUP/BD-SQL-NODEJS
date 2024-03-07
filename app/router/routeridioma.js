const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");

const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa el modelo de la base de datos
const User = require("../Users")(sequelize, Sequelize);
const Regiones = require("../Regiones")(sequelize, Sequelize);
const Idiomas = require("../Idiomas")(sequelize, Sequelize);

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);

router.get("/api/idiomas", async (req, res) => {
  try {
    const idiomas = await Idiomas.findAll();
    res.json(idiomas);
  } catch (error) {
    console.error("Error al obtener idiomas:", error);
    res.status(500).send("Ocurrió un error al obtener los idiomas");
  }
});

module.exports = router;
