const mongoose = require("mongoose");
const createServer = require("./server");

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.vskhknf.mongodb.net/testing?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = createServer();
    app.listen(PORT, () => {
      console.log("This server has started 🚀 🌕");
    });
  });
