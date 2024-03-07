const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./Users"); // Importa User desde ./Users

module.exports = (sequelize) => {
  const Idioma = sequelize.define(
    "Idioma",
    {
      IdiomaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Idiomas",
      timestamps: false,
      modelName: "Idioma",
    }
  );

  // Define la asociación aquí
  Idioma.associate = (models) => {
    Idioma.hasMany(models.User, { foreignKey: "IdiomaID" });
  };

  return Idioma;
};
