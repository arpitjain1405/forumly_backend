const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateDiscussion = function (discussion) {
  const schema = Joi.object({
    question: Joi.object({
      title: Joi.string().required().min(3).trim(),
      content: Joi.string().required().min(20).trim(),
    }).required(),
    categories: Joi.array().items(
      Joi.object({
        title: Joi.string().required().trim(),
        discription: Joi.string().min(10).trim(),
      }).required()
    ).required(),
  });
  return schema.validate(discussion);
};

const discussionSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Replies",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

exports.Discussion = mongoose.model("Discussion", discussionSchema);
