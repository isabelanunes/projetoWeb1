const jwt = require("jsonwebtoken");
const configKey = require("../config/key");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  if (!authHeader)
    return res.status(401).send({ error: "Token não informado " });

  jwt.verify(authHeader, configKey.key, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token inválido" });
    var decoded = jwt.decode(authHeader, { complete: true });
    console.log(decoded.payload);
    req.userId = decoded.id;
    return next();
  });
};
