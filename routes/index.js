var express = require("express");
var router = express.Router();
const { items } = require("../data/samples");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", items });
});

module.exports = router;
