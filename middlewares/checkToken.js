const jwt = require("jsonwebtoken");

//Middleware para checkear si el token es válido.
function checkToken(req, res, next) {
  const token = req.headers.authorization;
  const dataToken = token.split(" ")[1];

  try {
    const decodeToken = jwt.verify(dataToken, process.env.SECRET);
    req.rol = decodeToken.rol;
    next();
  } catch (error) {
    res.status(400).send("Token invalid");
  }
}

module.exports = checkToken;
