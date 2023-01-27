const express = require("express");
const routes = require("./src/api/routes/post.routes");

function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/api", routes);
  return app;
}

module.exports = createServer;
