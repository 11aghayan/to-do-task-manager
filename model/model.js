const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'must provide name']
  },
  state: {
   type: Number,
   default: 0,
   min: 0,
   max: 2
  }
});

const Tasks = mongoose.model('Task', TaskSchema)

module.exports = Tasks;