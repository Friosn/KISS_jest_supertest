const Model = require("../models/post.model");

const getAll = async (req, res, next) => {
  try {
    const models = await Model.find();
    res.status(201).json(models);
  } catch (error) {
    return next(404);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Model.findById(id);
    res.status(201).json(model);
  } catch (error) {
    return next(404);
  }
};

const postOne = async (req, res, next) => {
  try {
    const model = new Model({
      name: req.body.name,
      password: req.body.password,
    });
    const modelToDB = await model.save();
    res.status(201).json(modelToDB);
  } catch (error) {
    return next(404);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = new Model(req.body);
    model._id = id;
    const updateModel = await Model.findByIdAndUpdate(id);
    res.status(201).json(updateModel);
  } catch (error) {
    return next(404);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Model.findByIdAndDelete(id);
    res.status(201).json(model);
  } catch (error) {
    return next(404);
  }
};

module.exports = { getAll, getOne, postOne, patchOne, deleteOne };
