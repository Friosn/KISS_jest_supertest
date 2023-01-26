const mongoose = require("mongoose");

const Model = mongoose.Schema({
  name: String,
  password: String,
});

module.exports = mongoose.model("post", Model);

//We create a simple model to generate our CRUD from
