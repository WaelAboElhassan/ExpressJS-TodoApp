var express = require("express");
var router = express.Router();
const { items } = require("../data/samples");

router.get("/add-item", (req, res) => {
  res.render("add-item", { title: "Add Task" });
});

router.post("/add-item", (req, res) => {
  const { name, task } = req.body;

  const id = Date.now();
  items.push({ id, name, task });
  // console.log(`id:${id}, task => ${task}, name => ${name}`);
  res.redirect("/");
});

router.get("/edit-item/:item_id", function (req, res, next) {
  const item_id = parseInt(req.params.item_id);

  const [item] = items.filter((sitem) => {
    return sitem.id === item_id;
  });
  if (item) {
    return res.render("edit-item", { title: "Express", item });
  }
  res.render("error", { title: "Item Not Found" });
});

router.post("/update-item/:item_id", function (req, res, next) {
  const item_id = parseInt(req.params.item_id);
  const { name, task } = req.body;

  const [item] = items.filter((sitem) => {
    return sitem.id === item_id;
  });
  // found item
  if (item) {
    const updatedItem = { id: item.id, name, task };
    items.map((src_item, idx) => {
      if (src_item.id === item.id) {
        items.splice(idx, 1);
        items.push(updatedItem);
      }
    });

    return res.redirect("/");
  } else {
    res.status(404).render("error");
  }
});

router.post("/delete-item/:item_id", function (req, res, next) {
  const item_id = parseInt(req.params.item_id);

  items.map((src_item, idx) => {
    if (src_item.id === item_id) {
      items.splice(idx, 1);
    }
  });
  res.redirect("/");
});

module.exports = router;
