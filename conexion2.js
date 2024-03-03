const { Sequelize } = require("sequelize");
const insertUser = require("./migration");

// Luego de establecer la conexión con la base de datos
const sequelize = new Sequelize("ECOMMERCE", "sa", "braulioYrodrigo", {
  host: "BRAULIO\\SQLEXPRESS",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
});

// Importa el modelos de la base de datos
const User = require("./Users")(sequelize, Sequelize);

// Inserta datos en la base de datos
insertUser();

// Prueba la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

// Sincroniza el modelo con la base de datos
User.findAll()
  .then((users) => {
    console.log("Todos los usuarios:", JSON.stringify(users, null, 2));
  })
  .catch((err) => {
    console.error("Error al recuperar usuarios:", err);
  });
