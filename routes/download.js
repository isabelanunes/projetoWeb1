var express = require("express");
var router = express.Router();
var Data = require("../model/files");

router.get("/:filename", (req, res) => Data.download(req, res));

module.exports = router;
