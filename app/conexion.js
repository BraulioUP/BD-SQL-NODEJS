const express = require("express");
const path = require("path");
const passport = require("passport");

const { Sequelize } = require("sequelize");
//const insertUser = require("./migration");
const session = require("express-session");
const fs = require("fs");

const cors = require("cors");

// Inicializar la app Express
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Luego de establecer la conexión con la base de datos
const sequelize = require("./controllers/database");

// Importa el modelos de la base de datos
//const User = require("./Users")(sequelize, Sequelize);
// Importa el middleware cors

// Configura las opciones de cors
const corsOptions = {
  origin: "http://localhost:4321", // Reemplaza esto con tu dominio
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite las cookies de sesión
  optionsSuccessStatus: 200, // Algunos navegadores antiguos (IE11, varios SmartTVs) se ahogan con 204
};
// Usa el middleware cors con las opciones configuradas
app.use(cors(corsOptions));

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

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "Karma is a cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
// Inicializa Passport y la sesión de Passport
app.use(passport.initialize());
app.use(passport.session());

// Inserta datos en la base de datos
//insertUser();

// Ruta para obtener datos de usuarios en formato JSON
const routes = require("./routers/routes");
app.use(routes);

app.use("/files", express.static(path.join(__dirname, "public")));

// Ruta para servir la página HTML de usuarios
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/user.html"));
});
app.get("/apis", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/apis.html"));
});

app.get("/carspost", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/carspost.html"));
});
app.get("/cars", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/cars.html"));
});
app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/404.html"));
});
app.get("/editcars/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/editcars.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/login.html"));
});

app.get("/merchs", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/merchs.html"));
});
app.get("/merchsview", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/merchsview.html"));
});
app.get("/editmerchs/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/editmerchs.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/register.html"));
});


app.get("/directory", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/pages/directory.html"));
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "/robots.txt"));
});
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "/sitemap.xml"));
});

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.use(
  express.static("public", {
    setHeaders: function (res, path) {
      if (path.endsWith(".css")) {
        res.type("text/css");
      }
    },
  })
);
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
