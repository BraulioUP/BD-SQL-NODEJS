const Connection = require("tedious").Connection;
const Request = require("tedious").Request;

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

const connection = new Connection(config);

connection.on("connect", (err) => {
  if (err) {
    console.error("Error al conectarse a la base de datos:", err);
  } else {
    console.log("Conexión establecida con éxito.");
    executeStatement();
  }
});

connection.on("error", (err) => {
  console.error("Error de conexión:", err);
});

function executeStatement() {
  const request = new Request("SELECT 24/2", (err, rowCount) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
    } else {
      console.log(`Consulta ejecutada con éxito. Número de filas: ${rowCount}`);
    }
    connection.close();
  });

  request.on("row", (columns) => {
    columns.forEach((column) => {
      console.log(`${column.metadata.colName}: ${column.value}`);
    });
  });

  connection.execSql(request);
}

connection.connect();