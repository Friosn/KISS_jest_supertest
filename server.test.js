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

  await supertest(app)
    .get(`/api/posts/${post.id}`)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(post.id);
      expect(response.body.name).toBe(post.name);
      expect(response.body.password).toBe(post.password);
    });
});

test("POST /api/posts", async () => {
  const data = {
    name: "Third Poost",
    password: "blabla",
  }; // Defining the data that we'll be using to create the POST
  console.log(data);
  await supertest(app) //Calling the function of supertest with the argument of the Express app
    .post("/api/posts/") //Calling the POST function and we pass the route to do the post
    .send(data) // We send the object that's gonna be posted, this adds the content to the body of the request
    .expect(201) // We expect a successful and create response
    .then(async (response) => {
      console.log(response);
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      expect(response.body.password).toBe(data.password);
      try {
        const posting = await Model.findOne({ _id: response.body.id });
        console.log("Posting: ", posting);
        expect(posting).toBeTruthy();
        expect(posting.name).toBe(data.name);
        expect(posting.password).toBe(data.password);
      } catch (error) {
        console.error("Error while finding the post", error);
      }
    });
});
//THIS LAST PART FUCKED THE PREVIOUS TEST UP
