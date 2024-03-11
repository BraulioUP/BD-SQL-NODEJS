const { Sequelize } = require("sequelize");
const sequelize = require("../controllers/database");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa el modelo de la base de datos
const User = require("../models/Users")(sequelize, Sequelize);
const Regiones = require("../models/Regiones")(sequelize, Sequelize);
const Idiomas = require("../models/Idiomas")(sequelize, Sequelize);
const Vehiculo = require("../models/Vehiculo")(sequelize, Sequelize);
const Productos = require("../models/Productos")(sequelize, Sequelize);

// Establece las asociaciones
User.associate(sequelize.models);
Regiones.associate(sequelize.models);
Idiomas.associate(sequelize.models);

router.get("/api/productos", async (req, res) => {
  try {
    const { NombreProducto } = req.query;
    if (NombreProducto) {
      productos = productos.filter((producto) =>
        producto.NombreProducto.includes(NombreProducto)
      );
    }
    const productos = await Productos.findAll({
      order: [["CreatedAt", "DESC"]],
    });
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});

router.post("/api/productos", async (req, res) => {
  try {
    const producto = await Productos.create(req.body);

    

    return res.redirect("/merchsview");
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).send("Ocurrió un error al crear el producto");
  }
});

router.get("/api/productos?page=${page}", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const productos = await Productos.findAll({ limit, offset });

    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});
router.get("/editmerchs/:id", async (req, res) => {
  try {
    const producto = await Productos.findByPk(req.params.id);
    if (!producto) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log("Producto obtenido con éxito");
    // En lugar de renderizar una vista, envía el archivo HTML estático
    res.sendFile(path.join(__dirname, "../src/pages/editmerchs.html"));
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al obtener el producto" });
  }
});

router.get("/producto/:id", async (req, res) => {
  try {
    const producto = await Productos.findByPk(req.params.id);
    if (!producto) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log("Producto obtenido con éxito");

    res.json({ producto });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al obtener el producto" });
  }
});

router.put("/api/producto/:id", async (req, res) => {
  try {
    const producto = await Productos.findByPk(req.params.id);
    if (!producto) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log("Producto encontrado");
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar el producto" });
  }
});

router.delete("/api/producto/:id", async (req, res) => {
  try {
    const producto = await Productos.findByPk(req.params.id);
    if (!producto) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await producto.destroy();
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al eliminar el producto" });
  }
});

module.exports = router;
