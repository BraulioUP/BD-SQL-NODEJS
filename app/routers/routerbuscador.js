const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");

const { QueryTypes } = require("sequelize");

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa el modelo de la base de datos
const User = require("../models/Users")(sequelize, Sequelize);
const Regiones = require("../models/Regiones")(sequelize, Sequelize);
const Idiomas = require("../models/Idiomas")(sequelize, Sequelize);
const Vehiculo = require("../models/Vehiculo")(sequelize, Sequelize);
const CreditCard = require("../models/CreditCardInfo")(sequelize, Sequelize);
const Producto = require("../models/Productos")(sequelize, Sequelize);

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);
router.get("/buscar", function (req, res) {
  var busqueda = req.query.consulta;

  // Buscar en cada tabla
  Promise.all([
    User.findAll({
      where: {
        Nombre: {
          [Sequelize.Op.like]: "%" + busqueda + "%",
        },
      },
    }),
    Regiones.findAll({
      where: {
        Nombre: {
          [Sequelize.Op.like]: "%" + busqueda + "%",
        },
      },
    }),
    Idiomas.findAll({
      where: {
        Nombre: {
          [Sequelize.Op.like]: "%" + busqueda + "%",
        },
      },
    }),
    Vehiculo.findAll({
      where: {
        Modelo: {
          [Sequelize.Op.like]: "%" + busqueda + "%",
        },
      },
    }),
    CreditCard.findAll({
      where: {
        CardNumber: {
          [Sequelize.Op.like]: "%" + busqueda + "%",
        },
      },
    }),
    Producto.findAll({
      where: {
        NombreProducto: {
          [Sequelize.Op.like]: "%" + busqueda + "%",
        },
      },
    }),
  ])
    .then(function ([
      User,
      Regiones,
      Idiomas,
      Vehiculo,
      CreditCardInfo,
      Productos,
    ]) {
      // Devuelve los resultados de todas las tablas sin escaparlos
      res.json({
        User,
        Regiones,
        Idiomas,
        Vehiculo,
        CreditCardInfo,
        Productos,
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error al realizar la búsqueda" });
    });
});

module.exports = router;
