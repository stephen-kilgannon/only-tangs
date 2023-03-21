const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number
      },
    username: {
        type: String,
        lowercase: true 
      }, 
    name: String,
    password: String,
    createdAt: {
      type: Date,
      immutable: false,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  });

  


const User = mongoose.model('users', userSchema);

module.exports = {
    User
}