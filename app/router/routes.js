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
    const {
      IdiomaId,
      RegionId,
      Nombre,
      Apellido,
      Correo,
      ContrasenaHash,
      Telefono,
      Direccion,
    } = req.body;
    console.log(
      "Datos del registro:",
      IdiomaId,
      RegionId,
      Nombre,
      Apellido,
      Correo,
      ContrasenaHash,
      Telefono,
      Direccion
    );

    const user = await User.create({
      IdiomaId,
      RegionId,
      Nombre,
      Apellido,
      Correo,
      ContrasenaHash,
      Telefono,
      Direccion,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    console.error(error.stack);
    res.status(500).send("Ocurrió un error al crear el usuario");
  }
  res.json({ success: true, message: "Registro completado con éxito." });
});

router.post("/api/login", async (req, res) => {
  try {
    const { Correo, ContrasenaHash } = req.body;

    // Buscar al usuario con el correo proporcionado
    const usuario = await User.findOne({ where: { Correo } });

    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Verificar la contraseña
    // Aquí asumimos que estás almacenando las contraseñas como hashes
    // y que ContrasenaHash es el hash de la contraseña proporcionada por el usuario
    if (usuario.ContrasenaHash !== ContrasenaHash) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Si las credenciales son correctas, iniciar la sesión y responder con los datos del usuario
    // Aquí deberías generar un token de sesión o algo similar
    res.json(usuario);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Ocurrió un error al iniciar sesión");
  }
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
