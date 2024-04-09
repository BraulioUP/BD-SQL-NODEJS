const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Importa el modelo de la base de datos
const User = require("../models/Users")(sequelize, Sequelize);
const Regiones = require("../models/Regiones")(sequelize, Sequelize);
const Idiomas = require("../models/Idiomas")(sequelize, Sequelize);
const Vehiculo = require("../models/Vehiculo")(sequelize, Sequelize);
const Productos = require("../models/Productos")(sequelize, Sequelize);
const CreditCardInfo = require("../models/CreditCardInfo")(
  sequelize,
  Sequelize
);

const session = require("express-session");

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);

const routerusers = require("./routerusers");
router.use(routerusers);

const routeridioma = require("./routeridioma");
router.use(routeridioma);

const routerregiones = require("./routerregiones");
router.use(routerregiones);

const routervehiculo = require("./routervehiculo");
router.use(routervehiculo);

const routerproductos = require("./routerproductos");
router.use(routerproductos);

const routercreditcard = require("./routerCreditcard");
router.use(routercreditcard);

const routerdirecorios = require("./directorios");
router.use(routerdirecorios);

const routerbuscador = require("./routerbuscador");
router.use(routerbuscador);

module.exports = router;
