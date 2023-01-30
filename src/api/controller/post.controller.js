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
    res.status(200).json(model);
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
    const modelUpdate = new Model(req.body);
    modelUpdate._id = id;
    const modelToUpdate = await Model.findByIdAndUpdate(id, modelUpdate);
    res.status(200).json({
      new: modelUpdate,
      old: modelToUpdate,
    });
  } catch (error) {
    res.status(404);
    res.send("Error patchOne");
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findByIdAndDelete(id);
    res.status(204).json({
      deleted: model,
    });
  } catch (error) {
    res.status(404);
    res.send("Error deleteOne");
  }
};

module.exports = { getAll, getOne, postOne, patchOne, deleteOne };
