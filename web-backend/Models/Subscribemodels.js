const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;
