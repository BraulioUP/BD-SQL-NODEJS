// database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ECOMMERCE", "sa", "password", {
  host: "BRAULIO\\SQLEXPRESS",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;
