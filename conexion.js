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

connection.connect();

connection.on("connect", (err) => {
  if (err) {
    console.log("error al conectarse a la base de datos");
    throw err;
  }
  executeStatement();
});

function executeStatement() {
  const request = new Request("SELECT 24/2", (err, rowCont) => {
    if (err) {
      throw err;
    }
    connection.close();
  });
  request.on("row", (columms) => {
    console.log(columms);
  });

  connection.execSql(request);
}
