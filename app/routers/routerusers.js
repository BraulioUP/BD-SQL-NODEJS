const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcrypt");

const cors = require("cors");

app.use(cors());

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
router.post("/api/login", async (req, res) => {
  const { Correo, ContrasenaHash } = req.body;

  try {
    const user = await User.findOne({
      where: { Correo },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(ContrasenaHash, user.ContrasenaHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const token = jwt.sign({ UsuarioId: user.UsuarioId }, "Karma is cat", {
      expiresIn: "1h",
    });
    // Guarda el nombre y correo del usuario en la sesión
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: token,
      user: {
        Nombre: user.Nombre,
        Correo: user.Correo,
        ContrasenaHash: user.ContrasenaHash,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(401).json({ message: "Ocurrió un error al iniciar sesión" });
  }
});

router.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send("Ocurrió un error al eliminar el usuario");
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
router.post("/register", async (req, res) => {
  const { Nombre, Apellido, Correo, ContrasenaHash } = req.body;
  // Verifica que Contrasena no sea null o undefined
  if (!ContrasenaHash) {
    return res.status(400).send("La contraseña es requerida");
  }
  try {
    // Hashea la contraseña antes de guardarla
    if (typeof ContrasenaHash !== "string") {
      return res.status(400).send("La contraseña debe ser una cadena");
    }

    const Contrasena = await bcrypt.hash(ContrasenaHash, 10);
    const user = await User.create({
      Nombre,
      Apellido,
      Correo,
      ContrasenaHash: Contrasena,
    });
    console.log("Usuario creado:", user);
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    res.status(500).send("Ocurrió un error al crear el usuario");
  }
});
router.post("/login", async (req, res) => {
  const { Correo, ContrasenaHash } = req.body;

  try {
    const user = await User.findOne({
      where: { Correo },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(ContrasenaHash, user.ContrasenaHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const token = jwt.sign({ UsuarioId: user.UsuarioId }, "Karma is cat", {
      expiresIn: "1h",
    });
    // Guarda el nombre y correo del usuario en la sesión
    req.session.user = {
      Nombre: user.Nombre,
      Correo: user.Correo,
      ContrasenaHash: user.ContrasenaHash,
    };
    res.redirect("/");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(401).json({ message: "Ocurrió un error al iniciar sesión" });
  }
});
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Error al cerrar la sesión" });
    }

    res.clearCookie("Karma is cat");
    res.json({ message: "Sesión cerrada correctamente" });
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
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "No estás autenticado" });
  }

  res.json({ message: "Acceso concedido", user: user });
});

module.exports = router;
