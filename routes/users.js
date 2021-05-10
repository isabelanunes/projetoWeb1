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
  if (find) {
    res.status(404).json({ data: { mensagem: "usuario já cadastrado" } });
  } else {
    let users = await Data.insertUser(req.body.email, req.body.password);
    res.status(200).json(users);
  }
});

module.exports = router;