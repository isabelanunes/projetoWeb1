const express = require("express");
const autenticacao = require("../middlewares/validaToken");

var router = express.Router();

router.use(autenticacao);

router.get("/", (req, res) => {
  res.send({ ok: true });
});

module.exports = router;
