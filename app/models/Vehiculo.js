const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Vehiculo extends Model {}

  Vehiculo.init(
    {
      VehiculoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Modelo: {
        type: DataTypes.STRING,
      },
      Ano: {
        type: DataTypes.INTEGER,
      },
      Tipo: {
        type: DataTypes.STRING,
      },
      Autonomia: {
        type: DataTypes.INTEGER,
      },
      TiempoDeCarga: {
        type: DataTypes.DECIMAL(5, 2),
      },
      Potencia: {
        type: DataTypes.DECIMAL(10, 2),
      },
      Traccion: {
        type: DataTypes.STRING,
      },
      CapacidadDeBateria: {
        type: DataTypes.DECIMAL(10, 2),
      },
      NumeroDeAsientos: {
        type: DataTypes.INTEGER,
      },
      Precio: {
        type: DataTypes.DECIMAL(10, 2),
      },
      ColorExterior: {
        type: DataTypes.STRING,
      },
      ColorInterior: {
        type: DataTypes.STRING,
      },
      OpcionesDeRuedas: {
        type: DataTypes.STRING,
      },
      PaqueteDeAutopiloto: {
        type: DataTypes.BOOLEAN,
      },
      TechoSolar: {
        type: DataTypes.BOOLEAN,
      },
      ConexionInternet: {
        type: DataTypes.BOOLEAN,
      },
      SistemaDeSonidoPremium: {
        type: DataTypes.BOOLEAN,
      },
      ModoDeConduccion: {
        type: DataTypes.STRING,
      },
      // RutaDeImagen: DataTypes.STRING, // Descomentar si decides almacenar rutas de imagen
    },
    {
      sequelize,
      modelName: "Vehiculo",
      tableName: "Vehiculos", // Asegúrate de que el tableName esté en plural y en minúsculas si sigue tu convención
      timestamps: false, // Desactiva la gestión automática de las columnas createdAt y updatedAt
    }
  );

  return Vehiculo;
};
