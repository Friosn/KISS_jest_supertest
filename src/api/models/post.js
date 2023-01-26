const mongoose = require("mongoose");

const model = mongoose.Schema({
  name: String,
  password: String,
});

module.exports = mongoose.model("post", model);
