const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();

const sharp = require("sharp");
const multer = require("multer");
const fs = require("fs");

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

router.get("/api/idiomas", async (req, res) => {
  try {
    const idiomas = await Idiomas.findAll();
    res.json(idiomas);
  } catch (error) {
    console.error("Error al obtener idiomas:", error);
    res.status(500).send("Ocurrió un error al obtener los idiomas");
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

router.get("/api/vehiculos", async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      order: [["CreatedAt", "DESC"]],
    });
    res.json(vehiculos);
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).send("Ocurrió un error al obtener los vehículos");
  }
});
router.get("/api/vehiculos?page=${page}", async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.json(vehiculos);
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).send("Ocurrió un error al obtener los vehículos");
  }
});
router.get("/edit/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      console.log("Vehículo no encontrado");
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    console.log("Vehículo obtenido con éxito");
    // En lugar de renderizar una vista, envía el archivo HTML estático
    res.sendFile(path.join(__dirname, "../src/pages/edit.html"));
  } catch (error) {
    console.error("Error al obtener vehículo:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al obtener el vehículo" });
  }
});
router.get("/vehiculo/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    res.json({ vehiculo });
  } catch (error) {
    console.error("Error al obtener vehículo:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al obtener el vehículo" });
  }
});
router.put("/api/vehiculo/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      console.log("Vehículo no encontrado");
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    const vehiculoData = req.body;

    // Convierte 'on' a true y la ausencia de valor a false
    vehiculoData.TechoSolar = vehiculoData.TechoSolar === "on";
    vehiculoData.ConexionInternet = vehiculoData.ConexionInternet === "on";
    vehiculoData.SistemaDeSonidoPremium =
      vehiculoData.SistemaDeSonidoPremium === "on";

    await vehiculo.update(req.body);
    console.log("Vehículo actualizado con éxito");
    res.json({ vehiculo });
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar el vehículo" });
  }
});
router.delete("/api/vehiculo/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      console.log("Vehículo no encontrado");
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    await vehiculo.destroy();
    console.log("Vehículo eliminado con éxito");
    res.json({ message: "Vehículo eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al eliminar el vehículo" });
  }
});
// Configuración de Multer para guardar las imágenes en una carpeta local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre original del archivo
  },
});

const upload = multer({ storage: storage });

router.post("/carspost", upload.single("Imagen"), async (req, res) => {
  try {
    const vehiculoData = req.body;

    // Convierte 'on' a true y la ausencia de valor a false
    vehiculoData.TechoSolar = vehiculoData.TechoSolar === "on";
    vehiculoData.ConexionInternet = vehiculoData.ConexionInternet === "on";
    vehiculoData.SistemaDeSonidoPremium =
      vehiculoData.SistemaDeSonidoPremium === "on";

    // Desestructura los datos del vehículo y agrega 'Imagen' desde req.file.filename
    const {
      Marca,
      Modelo,
      Ano,
      Tipo,
      Autonomia,
      TiempoDeCarga,
      Potencia,
      Traccion,
      CapacidadDeBateria,
      NumeroDeAsientos,
      Precio,
      ColorExterior,
      ColorInterior,
      OpcionesDeRuedas,
      PaqueteDeAutopiloto,
      TechoSolar,
      ConexionInternet,
      SistemaDeSonidoPremium,
      ModoDeConduccion,
    } = req.body;

    // Obteniendo el nombre del archivo de la imagen cargada
    const Imagen = req.file.filename;

    // Crear el vehículo en la base de datos
    const vehiculo = await Vehiculo.create({
      Marca,
      Modelo,
      Ano,
      Tipo,
      Autonomia,
      TiempoDeCarga,
      Potencia,
      Traccion,
      CapacidadDeBateria,
      NumeroDeAsientos,
      Precio,
      ColorExterior,
      ColorInterior,
      OpcionesDeRuedas,
      PaqueteDeAutopiloto,
      TechoSolar,
      ConexionInternet,
      SistemaDeSonidoPremium,
      ModoDeConduccion,
      Imagen,
    });

    // Eliminar el archivo temporal
    fs.unlinkSync(req.file.path);
    return res.redirect("/cars");
  } catch (error) {
    console.error("Error al crear Vehiculo:", error.message);
    console.error(error.stack);
    res.status(500).send("Ocurrió un error al crear el Vehiculo");
  }
});

module.exports = router;
