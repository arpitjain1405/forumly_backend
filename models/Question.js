const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateQuestion = function (question) {
  

  const schema = Joi.object({
    title: Joi.string().required().min(3).trim(),
    content: Joi.string().required().min(20).trim(),
  });

  return schema.validate(question);
};

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.Question = mongoose.model("Question", questionSchema);
