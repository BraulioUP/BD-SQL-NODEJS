const express = require("express");
const path = require("path");

const { Sequelize } = require("sequelize");
const insertUser = require("./migration");

// Inicializar la app Express
const app = express();
const PORT = 3000;

// Luego de establecer la conexión con la base de datos
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

// Importa el modelos de la base de datos
const User = require("./Users")(sequelize, Sequelize.DataTypes);

// Sincronizar los modelos con la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados con la base de datos.");

    // Iniciar el servidor después de sincronizar los modelos
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });

// Inserta datos en la base de datos
//insertUser();

// Ruta para obtener datos de usuarios en formato JSON
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await User.findAll(); // Asegúrate de que estás usando 'User', no 'Usuarios'
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Ocurrió un error al obtener los usuarios");
  }
});

// Ruta para servir la página HTML de usuarios
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Prueba la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

// Sincroniza el modelo con la base de datos
/*User.findAll()
  .then((users) => {
    console.log("Todos los usuarios:", JSON.stringify(users, null, 2));
  })
  .catch((err) => {
    console.error("Error al recuperar usuarios:", err);
  });
*/
