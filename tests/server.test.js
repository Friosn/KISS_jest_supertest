const supertest = require("supertest");
const Model = require("../src/api/models/post.model");
const mongoose = require("mongoose");
const createServer = require("../server");
const { response } = require("express");
const { post } = require("../src/api/routes/post.routes");

const TEST_MONGO_URI = process.env.TEST_MONGO_URI;

beforeEach((done) => {
  mongoose.connect(
    TEST_MONGO_URI, // If this does not work, try by inserting directly the test URI here (It did not worked for me, I had the URI directly there, that will do it)
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
// As I am using a testing MongoDB, I would not need to drop all the
// database, or dataCollection in this case after each test.

const app = createServer();

test("GET /api/posts", async () => {
  const post = await Model.create({
    name: "First Postt",
    password: "blabla",
  }); // We create a post to test the GET
  await supertest(app) //Calling the server with supertest
    .get("/api/posts") // Direction where to getALL
    .expect(200) // Successful response expected
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
    .get(`/api/posts/${post.id}`) // Now we use the id to get one specific object, getOne
    .expect(200)
    .then((response) => {
      /*  console.log("Get by id: ", response); */
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
  await supertest(app) // Calling the function of supertest with the argument of the Express app
    .post("/api/posts/") // Calling the POST function and we pass the route to do the post
    .send(data) // We send the object that's gonna be posted, this adds the content to the body of the request
    .expect(201) // We expect a successful and create response
    .then(async (response) => {
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      expect(response.body.password).toBe(data.password);
      try {
        const posting = await Model.findOne({ name: data.name });
        /*  console.log("Posting: ", posting); */
        expect(posting).toBeTruthy();
        expect(posting.name).toBe(data.name);
        expect(posting.password).toBe(data.password);
      } catch (error) {
        console.error("Error while finding the post", error);
      }
    });
});

//THIS SHOULD BE REREVIEWED

test("PATCH /api/posts/:id", async () => {
  const post = await Model.create({
    name: "Fifth post",
    password: "bleble",
  }); // We create a post that will be updated
  const update = {
    name: "It is the FORTH",
    password: "bloblo",
  }; // The post will be updated with this data
  await supertest(app)
    .patch(`/api/posts/${post.id}`) // We call the patch() for this path
    .send(update) //We send the update
    .expect(200) //Expected response for a PUT/PATCH/GET method
    .then(async (response) => {
      //We check the response
      /* console.log("Patch body response: ", response.body.new); */
      // We check on .new because in the controller we send the updated version
      // and the old version, so we have to check the update
      expect(response.body.new._id).toBe(post.id);
      expect(response.body.new.name).toBe(update.name);
      expect(response.body.new.password).toBe(update.password);

      //Now we check the database's data
      let newPost;
      try {
        newPost = await Model.findOne({ _id: response.body.new._id });
      } catch (error) {
        console.error("Impossible to get newPost: ", error);
      }

      /* console.log("newPost: ", newPost); */
      expect(newPost).toBeTruthy(); //we check that there actually exist newPost
      expect(newPost.name).toBe(update.name); // And that newPost.name is equal to the update.name
      expect(newPost.password).toBe(update.password); // And the same for the password, that will mean that the data was patched
    });
});

test("DELETE /api/posts/:id", async () => {
  const post = await Model.create({
    name: "Left Over",
    password: "blibli",
  });
  await supertest(app)
    .delete(`/api/posts/${post.id}`) // We delete the post.id with the following route
    .expect(204) // Expected response when the content has been deleted and there is no more content to show
    .then(async () => {
      expect(await Model.findOne({ _id: post.id })).toBeFalsy(); //We try to find the element by the id, since it was deleted, this should be false
    });
});
