var express = require("express");
var router = express.Router();
var Data = require("../model/db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// /uses/data
router.get("/data", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async function (req, res, next) {
  let find = await Data.findUser(req.body.email);
  let verify = await Data.verifyUser(req.body.email, req.body.password);
  if (find) {
    if (verify) {
      return res.status(200).json(find);
    } else {
      res
        .status(404)
        .json({ data: { mensagem: "Usuário e senha não conferem!" } });
    }
  } else {
    res.status(404).json({ data: { mensagem: "Usuário não encontrado!" } });
    let users = await Data.insertUser(req.body.email, req.body.password);
    res.status(200).json(users);
  }
});

module.exports = router;
