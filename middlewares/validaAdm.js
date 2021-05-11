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
    let admin = JSON.parse(decoded.payload.payload).admin;
    if (admin == "false")
      return res.status(400).send({ error: "Usuário não tem permissão!" });

    console.log(admin);
    return next();
  });
};
