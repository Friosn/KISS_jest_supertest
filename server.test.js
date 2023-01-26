const supertest = require("supertest");
const Model = require("./src/api/models/post.model");
const mongoose = require("mongoose");
const createServer = require("./server");

beforeEach((done) => {
  mongoose.connect(
    "mongodb+srv://root:root@cluster0.vskhknf.mongodb.net/testing?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

/* afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
 */ //As I am using a testing MongoDB, I would not need to drop all the database after each test.

const app = createServer();
