const Model = require("../models/post.model");

const getAll = async (req, res) => {
  try {
    const models = await Model.find();
    res.send(models);
  } catch (error) {
    res.status(404);
    res.send("Error getAll");
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findById(id);
    res.status(201).json(model);
  } catch (error) {
    res.status(404);
    res.send("Error getOne");
  }
};

const postOne = async (req, res) => {
  try {
    const model = new Model({
      name: req.body.name,
      password: req.body.password,
    });
    const modelToDB = await model.save();
    res.status(201).json(modelToDB);
  } catch (error) {
    res.status(404);
    res.send("Error postOne");
  }
};

const patchOne = async (req, res) => {
  try {
    const { id } = req.params;
    const model = new Model(req.body);
    model._id = id;
    const updateModel = await Model.findByIdAndUpdate(id);
    res.status(201).json(updateModel);
  } catch (error) {
    res.status(404);
    res.send("Error patchOne");
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findByIdAndDelete(id);
    res.status(201).json(model);
  } catch (error) {
    res.status(404);
    res.send("Error deleteOne");
  }
};

module.exports = { getAll, getOne, postOne, patchOne, deleteOne };
