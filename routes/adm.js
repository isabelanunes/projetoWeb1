const express = require("express");
const validaAdm = require("../middlewares/validaAdm");

var router = express.Router();

router.use(validaAdm);

router.get("/", (req, res) => {
  res.send({ adm: true });
});

module.exports = router;
