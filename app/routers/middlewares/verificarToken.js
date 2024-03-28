function verificarToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res
      .status(403)
      .json({ message: "No se proporcionó token de autenticación" });
  }

  const token = bearerHeader.split(" ")[1]; // Separar "Bearer" del token propiamente dicho

  if (!token) {
    return res
      .status(403)
      .json({ message: "El formato del token es incorrecto" });
  }

  jwt.verify(
    token,
    "Karma is a cat",
    { algorithms: ["HS256"] },
    (err, decoded) => {
      if (err) {
        // Aquí podrías manejar diferentes tipos de errores de manera específica
        return res.status(500).json({
          message: "Falló la autenticación del token",
          error: err.message,
        });
      }

      // Si la verificación es exitosa, guarda el payload del token en req.user
      req.user = decoded;
      next();
    }
  );
}

module.exports = verificarToken;
