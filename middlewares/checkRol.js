//Middle para chequear el rol
function checkRol(req, res, next) {
  const rol = req.rol;
  if (rol === "admin" || rol === "user") next();
  else res.status(500).send("No está autorizado");
}

module.exports = checkRol;
