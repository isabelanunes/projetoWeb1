var express = require("express");
var router = express.Router();
var Data = require("../model/db");
var jwt = require("jsonwebtoken");
const configKey = require("../config/key");

function generateToken(query = {}) {
  return jwt.sign(query, configKey.key, {
    expiresIn: 86400, //expira em 1 dia
  });
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// /uses/data
router.get("/data", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async function (req, res, next) {
  let find = await Data.findUser(req.body.email); // aqui verifica se já existe usuario com msm email
  let verify = await Data.verifyUser(req.body.email, req.body.password); // confere dados
  if (!find) {
    res.status(404).json({ data: { mensagem: "Usuário não encontrado!" } });
  } else if (!verify) {
    res
      .status(404)
      .json({ data: { mensagem: "Usuário e senha não conferem!" } });
  } else {
    return res.status(200).json({
      token: generateToken({
        email: `${req.body.email}`,
        admin: `${verify.admin}`,
      }),
    });
  }
});

module.exports = router;
