const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
