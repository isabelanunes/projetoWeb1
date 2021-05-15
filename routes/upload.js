var express = require("express");
var router = express.Router();
var Data = require("../model/files");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) =>
  Data.insertFile(req, res)
);

router.get("/", function (req, res, next) {
  let files = Data.findAll();
  files.then((result) => {
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

router.post("/data", function (req, res, next) {
  let file = Data.findData(req.body.data);
  file.then((result) => {
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

module.exports = router;
