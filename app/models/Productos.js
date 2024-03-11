const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Productos extends Model {}
  Productos.init(
    {
      ProductoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NombreProducto: {
        type: DataTypes.STRING,
      },
      Descripcion: {
        type: DataTypes.STRING,
      },
      Precio: {
        type: DataTypes.DECIMAL(10, 2),
      },
      Stock: {
        type: DataTypes.INTEGER,
      },
      Categoria: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Productos",
      tableName: "Productos", // Asegúrate de que el tableName esté en plural y en minúsculas si sigue tu convención
      timestamps: false, // Desactiva la gestión automática de las columnas createdAt y updatedAt
    }
  );

  // Define la asociación aquí si es necesario

  return Productos;
};
