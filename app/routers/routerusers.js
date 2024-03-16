const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");

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

const routeridioma = require("./routeridioma");
router.use(routeridioma);

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

router.post("/login", async (req, res) => {
  const { Correo, Nombre, ContrasenaHash } = req.body;

  try {
    const user = await User.findOne({
      where: { Correo, Nombre },
    });

    if (!user || user.ContrasenaHash !== ContrasenaHash) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ UsuarioId: user.UsuarioId }, "keyboard cat", {
      expiresIn: "1h",
    });
    // Guarda el nombre y correo del usuario en la sesión
    req.session.user = {
      Nombre: user.Nombre,
      Correo: user.Correo,
    };
    res.redirect("/");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Ocurrió un error al iniciar sesión" });
  }
});
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res
        .status(500)
        .json({ message: "Ocurrió un error al cerrar sesión" });
    }

    res.json({ message: "Cierre de sesión exitoso" });
  });
});
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No estás autenticado" });
  }

  res.json(req.session.user);
});
const verificarToken = require("./middlewares/verificarToken"); // Asegúrate de que la ruta sea correcta

router.get("/ruta_protegida", verificarToken, (req, res) => {
  // Esta ruta está protegida, solo los usuarios autenticados pueden acceder a ella
  res.json({ message: "Esta es una ruta protegida" });
});
module.exports = router;
