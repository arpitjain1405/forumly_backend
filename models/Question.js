const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
  },
  content: {
    type: String,
    required: true,
    minLength: 20,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
