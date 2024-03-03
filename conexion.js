const express = require("express");
const { Connection, Request } = require("tedious");

var config = {
  server: "BRAULIO\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "ejemplo",
      password: "braulioYrodrigo"
    },
  },
  options: {
    port: 1433,
    database: "ECOMMERCE",
    trustServerCertificate: true,
    encrypt: false,
  },
};

const app = express();
const port = 3000; 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/usuarios", (req, res) => {
  const connection = new Connection(config);
  
  connection.on("connect", function (err) {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      res.status(500).json({ error: "Error al conectar a la base de datos" });
    } else {
      const sql = "SELECT * FROM Usuarios";
      const request = new Request(sql, (err, rowCount) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          res.status(500).json({ error: "Error al ejecutar la consulta en la base de datos" });
        } else if (rowCount === 0) {
          res.json({ error: "No se encontraron usuarios" });
        }
        // No need to close the connection here, it will be closed after the request is done
      });
      
      const result = [];
      request.on('row', columns => {
        let item = {};
        columns.forEach(column => {
          item[column.metadata.colName] = column.value;
        });
        result.push(item);
      });

      request.on('requestCompleted', function () {
        // Send the result once the request is completed
        res.json(result);
        connection.close();
      });
      
      connection.execSql(request);
    }
  });

  connection.on("error", function (err) {
    console.error("Error de conexión:", err);
    res.status(500).json({ error: "Error de conexión" });
  });

  connection.connect();
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});