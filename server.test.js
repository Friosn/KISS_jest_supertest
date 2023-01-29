const supertest = require("supertest");
const Model = require("./src/api/models/post.model");
const mongoose = require("mongoose");
const createServer = require("./server");
const { response } = require("express");

beforeEach((done) => {
  mongoose.connect(
    "mongodb+srv://root:root@cluster0.vskhknf.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropCollection("posts", (err, result) => {
    if (err) console.log(err);
    mongoose.connection.close(() => done());
  });
});
//As I am using a testing MongoDB, I would not need to drop all the database after each test.

const app = createServer();

test("GET /api/posts", async () => {
  const post = await Model.create({
    name: "First Postt",
    password: "blabla",
  });
  await supertest(app)
    .get("/api/posts")
    .expect(200)
    .then((response) => {
      //checking the response type and length ⬇️
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      //checking the response data ⬇️
      expect(response.body[0]._id).toBe(post.id);

      expect(response.body[0].name).toBe(post.name);
      expect(response.body[0].password).toBe(post.password);
    });
});

test("GET api/posts/:id", async () => {
  const post = await Model.create({
    name: "Second Postt",
    password: "blabla",
  });
  console.log(post);
  await supertest(app)
    .get(`/api/posts/${post.id}`)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(post.id);
      expect(response.body.name).toBe(post.name);
      expect(response.body.password).toBe(post.password);
    });
});

/* test("POST api/posts", async () => {
  const post = Model.create({
    name: "Third Poost",
    password: "blabla",
  });
  await supertest;
});
console.log(post);
await supertest(app)
  .post("api/posts")
  .expect(201)
  .then((response) => {
    console.log(response);
    expect(response.body._id).toBe(post.id);
    expect(response.body.name).toBe(post.name);
    expect(response.body.password).toBe(post.password);
  });
}); */
//THIS LAST PART FUCKED THE PREVIOUS TEST UP
