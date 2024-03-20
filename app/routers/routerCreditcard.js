const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa el modelo de la base de datos
const User = require("../models/Users")(sequelize, Sequelize);
const Regiones = require("../models/Regiones")(sequelize, Sequelize);
const Idiomas = require("../models/Idiomas")(sequelize, Sequelize);
const CreditCardInfo = require("../models/CreditCardInfo")(sequelize, Sequelize);

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);

// Rutas
router.get("/api/creditcard", async (req, res) => {
  const creditcard = await CreditCardInfo.findAll();
  res.json(creditcard);
});
router.post("/api/creditcard", async (req, res) => {
  const creditcard = await CreditCardInfo.create(req.body);
  res.json(creditcard);
});
router.put("/api/creditcard/:id", async (req, res) => {
  const creditcard = await CreditCardInfo.findByPk(req.params.id);
  await creditcard.update(req.body);
  res.json(creditcard);
});
router.delete("/api/creditcard/:id", async (req, res) => {
  const creditcard = await CreditCardInfo.findByPk(req.params.id);
  await creditcard.destroy();
  res.json(creditcard);
});


module.exports = router;
