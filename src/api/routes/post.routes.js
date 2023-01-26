const express = require("express");
const Router = express.Router();

const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require("../controller/post.controller");

Router.get("/posts", getAll);
Router.get("/posts/:id", getOne);
Router.post("/posts", postOne);
Router.patch("/posts/:id", patchOne);
Router.delete("/posts/:id", deleteOne);

module.exports = Router;
