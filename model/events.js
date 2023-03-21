const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    message: String,
    type: String,
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
    user: [{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  });


const Event = mongoose.model('events', eventSchema);

module.exports = {
    Event
}