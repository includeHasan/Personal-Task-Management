//User Modal
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TaskManager")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;