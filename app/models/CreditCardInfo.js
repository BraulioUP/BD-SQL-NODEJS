const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CreditCardInfo extends Model {}
  CreditCardInfo.init(
    {
      CreditCardInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CardholderName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CardNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      ExpirationMonth: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ExpirationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CVV: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      BillingPostalCode: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CreditCardInfo ",
      tableName: "CreditCardInfo ", // Asegúrate de que el tableName esté en plural y en minúsculas si sigue tu convención
      timestamps: false, // Desactiva la gestión automática de las columnas createdAt y updatedAt
    }
  );

  // Define la asociación aquí si es necesario

  return CreditCardInfo;
};
