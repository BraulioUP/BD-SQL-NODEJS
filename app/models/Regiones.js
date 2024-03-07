const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Region = sequelize.define(
    "Region",
    {
      RegionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Regiones",
      timestamps: false,
      modelName: "Region",
    }
  );

  // Define la asociación aquí
  Region.associate = (models) => {
    Region.hasMany(models.User, { foreignKey: "RegionID" });
  };

  return Region;
};
