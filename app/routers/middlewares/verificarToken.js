const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó token de autenticación' });
  }

  jwt.verify(token, 'keyboard cat', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Falló la autenticación del token' });
    }

    // Si la verificación es exitosa, guarda el payload del token en req.user
    req.user = decoded;
    next();
  });
}

module.exports = verificarToken;