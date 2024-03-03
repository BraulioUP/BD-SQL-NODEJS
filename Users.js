const User = sequelize.define(
  "User",
  {
    // Estos son los atributos del modelo. Asegúrate de que coincidan con los nombres de las columnas de la base de datos.
    UsuarioID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Si el ID se autoincrementa
    },
    RegionID: {
      type: Sequelize.INTEGER,
    },
    IdiomaID: {
      type: Sequelize.INTEGER,
    },
    Nombre: {
      type: Sequelize.STRING,
    },
    Apellido: {
      type: Sequelize.STRING,
    },
    Correo: {
      type: Sequelize.STRING,
    },
    ContrasenaHash: {
      type: Sequelize.STRING, // O Sequelize.BLOB si estás guardando un hash en binario
    },
    FechaRegistro: {
      type: Sequelize.DATE,
    },
  },
  {
    // Estas son las opciones del modelo
    tableName: "Usuarios", // Nombre de la tabla. Asegúrate de que coincida exactamente.
    timestamps: false, // Si la tabla no tiene las columnas createdAt y updatedAt
    sequelize, // Pasamos la instancia de conexión
  }
);
