const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateReply = function (reply) {
  const schema = Joi.object({
    content: Joi.string().required().min(1).trim(),
    parentReplyId: Joi.string().hex().length(24).message("Invalid Id")
  });

  return schema.validate(reply);
};

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
    parentReply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

exports.Reply = mongoose.model("Reply", replySchema);
