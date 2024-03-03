const express = require("express");
const { Connection, Request, TYPES } = require("tedious");

var config = {
  server: "BRAULIO\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "ejemplo",
      password: "braulioYrodrigo",
    },
  },
  options: {
    port: 1433,
    database: "ECOMMERCE",
    trustServerCertificate: true,
  },
};

// Crear una nueva aplicación express
const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor

const connection = new Connection(config);

connection.on("connect", function (err) {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos");
  }
});

connection.on("error", function (err) {
  console.error("Error de conexión:", err);
});

// Definir una ruta para la página web principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Asegúrate de tener un archivo index.html en tu directorio
});

// Definir una ruta para la API que proporcionará los datos de los usuarios
app.get("/api/usuarios", (req, res) => {
  const sql = "SELECT * FROM Usuarios";
  const request = new Request(sql, (err, rowCount, rows) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error al ejecutar la consulta en la base de datos");
      return;
    }
    const result = rows.map((row) => {
      let item = {};
      row.forEach((column) => {
        item[column.metadata.colName] = column.value;
      });
      return item;
    });
    res.json(result); // Enviar los datos como JSON
    // No cierres la conexión aquí
  });

  connection.execSql(request);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

connection.connect();

// Puedes cerrar la conexión cuando el servidor se detenga
process.on("exit", () => {
  connection.close();
});
