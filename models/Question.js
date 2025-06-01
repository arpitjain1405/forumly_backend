const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateQuestion = function (question) {
  const objectId = () => {
    return Joi.string().length(24).hex().message("Invalid ObjectId");
  };

  const schema = Joi.object({
    title: Joi.string().required().min(3),
    content: Joi.string().required().min(20),
    owner: objectId().required(),
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
