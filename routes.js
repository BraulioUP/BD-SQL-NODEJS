const { Sequelize } = require("sequelize");
const sequelize = require("./database");

const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      include: [
        {
          model: Regiones,
          as: "Region",
          attributes: ["RegionId", "Nombre"],
        },
        {
          model: Idiomas, 
          as: "Idioma",
          attributes: ["IdiomaId", "Nombre", "Codigo"],
        },
      ],
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Ocurrió un error al obtener los usuarios");
  }
});
router.post("/api/users", async (req, res) => {
  try {
    const { IdiomaId, RegionId, Nombre, Apellido, Correo, ContrasenaHash } =
      req.body;
    console.log(
      "Datos del registro:",
      IdiomaId,
      RegionId,
      Nombre,
      Apellido,
      Correo,
      ContrasenaHash
    );

    const user = await User.create({
      IdiomaId,
      RegionId,
      Nombre,
      Apellido,
      Correo,
      ContrasenaHash,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    console.error(error.stack);
    res.status(500).send("Ocurrió un error al crear el usuario");
  }
  res.json({ success: true, message: "Registro completado con éxito." });
});

router.get("/api/regiones", async (req, res) => {
  try {
    const regiones = await Regiones.findAll();
    res.json(regiones);
  } catch (error) {
    console.error("Error al obtener regiones:", error);
    res.status(500).send("Ocurrió un error al obtener las regiones");
  }
});
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
