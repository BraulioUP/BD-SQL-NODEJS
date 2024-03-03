// Otras configuraciones de Express...

// Ruta para obtener datos de usuario
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Ocurrió un error al obtener los usuarios");
  }
});

// Otras configuraciones de Express...

// Ruta para servir la página HTML de usuarios
app.get("/usuarios", (req, res) => {
  res.sendFile("index.html");
});
