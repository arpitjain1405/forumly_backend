const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateDiscussion = function (discussion) {
  const schema = Joi.object({
    question: Joi.object({
      title: Joi.string().required().min(3),
      content: Joi.string().required().min(20),
    }),
    categories: [
      Joi.object({
        title: Joi.string().required(),
        discription: Joi.string().min(10),
      }).required(),
    ],
  });
  return schema.validate(discussion);
};

const discussionSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
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
