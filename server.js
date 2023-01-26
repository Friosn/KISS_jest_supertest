const express = require("express");
const Router = require("./src/api/routes/post.routes");

function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/api", Router);
  return app;
}

module.exports = createServer;
