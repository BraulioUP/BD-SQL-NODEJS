const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      // Estos son los atributos del modelo. Asegúrate de que coincidan con los nombres de las columnas de la base de datos.
      UsuarioID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RegionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Regiones", // Nombre del modelo de la tabla Regiones
          key: "RegionID",
        },
      },
      IdiomaID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Idiomas", // Nombre del modelo de la tabla Idiomas
          key: "IdiomaID",
        },
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ContrasenaHash: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
    },
    {
      // Estas son las opciones del modelo
      tableName: "Usuarios", // Nombre de la tabla. Asegúrate de que coincida exactamente.
      timestamps: false, // Si la tabla no tiene las columnas createdAt y updatedAt
      sequelize, // Pasamos la instancia de conexión
    }
  );
};
