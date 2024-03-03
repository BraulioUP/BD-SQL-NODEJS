const { Sequelize } = require("sequelize");

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

const User = require("./Users")(sequelize, Sequelize);

const insertUser = () => {
  // Inserta un nuevo usuario

  User.create({
    // Tus datos aquí
    RegionID: 2,
    IdiomaID: 2,
    Nombre: "Braulio",
    Apellido: "Uc",
    Correo: "Braulioalexosn@gmail.com",
    ContrasenaHash: Buffer.from("02000D3A", "hex"), // Suponiendo que el hash es hexadecimal y quieres guardarlo como binario
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
