var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("add-item", { title: "Add Item" });
});

module.exports = router;
