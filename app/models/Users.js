const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcryptjs"); // Asumiendo que estás utilizando bcryptjs para el hashing
const Regiones = require("./Regiones");
const Idiomas = require("./Idiomas");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      // Atributos del modelo
      UsuarioId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RegionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Regiones", // Nombre de la tabla
          key: "RegionId",
        },
      },
      IdiomaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Idiomas", // Nombre de la tabla
          key: "IdiomaId",
        },
      },
      Nombre: {
        type: Sequelize.STRING,
      },
      Apellido: {
        type: Sequelize.STRING,
      },
      Correo: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true, // Validación para asegurar que el campo es un correo electrónico
        },
      },
      ContrasenaHash: {
        type: Sequelize.STRING,
      },
      Telefono: {
        type: Sequelize.STRING,
      },
      Direccion: {
        type: Sequelize.STRING,
      },
    },
    {
      // Opciones del modelo
      sequelize,
      modelName: "User", // Asegúrate de que el modelName esté en singular y capitalizado si sigue tu convención
      tableName: "Usuarios",
      timestamps: false, // Habilita los campos createdAt y updatedAt

      paranoid: true, // Habilita el borrado suave
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Region, { foreignKey: "RegionId" });
    User.belongsTo(models.Idioma, { foreignKey: "IdiomaId" });
  };

  return User;
};
