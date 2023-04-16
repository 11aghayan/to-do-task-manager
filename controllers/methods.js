const Tasks = require('../model/model.js');
const asyncWrapper = require('../middleware/async-wrapper.js');


const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);

  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Tasks.findOne({_id: id});

  res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res) => {
  const cond = {_id: req.params.id};
  const options = {
    runValidators: true,
    new: false
  };
  const task = await Tasks.findOneAndUpdate(cond, req.body, options);
  res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res) => {
  const cond = {_id: req.params.id};
  const task = await Tasks.findOneAndDelete(cond);

  res.status(200).json({task})
});


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
};