const mongoose = require("mongoose");
const createServer = require("./server");

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(() => {
  const app = createServer();
  app.listen(PORT, () => {
    console.log("This server has started 🚀 🌕");
  });
});
