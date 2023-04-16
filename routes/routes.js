const express = require('express');
const router = express.Router();
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getAllTasks
} = require('../controllers/methods.js');


router.route('/')
  .get(getAllTasks)
  .post(createTask);
router.route('/:id')
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;