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

router.get("/editcars/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      console.log("Vehículo no encontrado");
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    console.log("Vehículo obtenido con éxito");
    // En lugar de renderizar una vista, envía el archivo HTML estático
    res.sendFile(path.join(__dirname, "../src/pages/editcars.html"));
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
app.get("/uploads/:id", async (req, res) => {
  const vehiculo = await Vehiculo.findByPk(req.params.id);

  if (vehiculo && vehiculo.Imagen) {
    // Si el vehículo tiene una imagen, enviarla como respuesta
    res.contentType("image/png");
    res.send(vehiculo.Imagen);
  } else {
    // Si no hay imagen, puedes enviar una imagen de marcador de posición o un mensaje de error
    res.status(404).send("No se encontró la imagen");
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

    return res.redirect("/cars");
  } catch (error) {
    console.error("Error al crear Vehiculo:", error.message);
    console.error(error.stack);
    res.status(500).send("Ocurrió un error al crear el Vehiculo");
  }
});

module.exports = router;
