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
