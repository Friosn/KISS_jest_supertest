const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require("../controller/post.controller");

router.get("/posts", getAll);
router.get("/posts/:id", getOne);
router.post("/posts", postOne);
router.patch("/posts/:id", patchOne);
router.delete("/posts/:id", deleteOne);

module.exports = router;
