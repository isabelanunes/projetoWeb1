var express = require("express");
var router = express.Router();
var Data = require("../model/db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  let users = Data.find();
  users.then((result) => {
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

router.post("/", async function (req, res, next) {
  let find = await Data.findUser(req.body.email);
  if (find) {
    res.status(404).json({ data: { mensagem: "usuario já cadastrado" } });
  } else {
    let users = await Data.insertUser(req.body.email, req.body.password, false);
    res.status(200).json(users);
  }
});

router.post("/admin", async function (req, res, next) {
  let find = await Data.findUser(req.body.email);
  if (find) {
    res.status(404).json({ data: { mensagem: "usuario já cadastrado" } });
  } else {
    let users = await Data.insertUser(req.body.email, req.body.password, true);
    res.status(200).json(users);
  }
});

module.exports = router;
