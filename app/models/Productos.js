const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Productos = sequelize.define(
    "Productos",
    {
      ProductoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NombreProducto: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Productos",
      timestamps: false,
      modelName: "Productos",
    }
  );

  // Define la asociación aquí si es necesario

  return Productos;
};
