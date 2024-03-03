const { Sequelize } = require("sequelize");

const sequelize = require("./database");

const User = require("./Users")(sequelize, Sequelize);

const insertUser = () => {
  // Inserta un nuevo usuario

  User.create({
    // Tus datos aquí
    RegionID: 3,
    IdiomaID: 1,
    Nombre: "Rodrigo",
    Apellido: "Uc",
    Correo: "rodrigo@gmail.com",
    ContrasenaHash: "amam"
  })
    .then((user) => {
      console.log("Nuevo usuario insertado:", user.toJSON());
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        console.error("El correo electrónico ya está en uso.");
      } else {
        console.error("Error al insertar nuevo usuario:", err);
      }
    });
};

module.exports = insertUser;
