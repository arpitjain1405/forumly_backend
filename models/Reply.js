const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateReply = function (reply) {
  const ownerId = () => {
    return Joi.string().required().hex().length(24).message("Invalid ownerId");
  };
  const discussionId = () => {
    return Joi.string()
      .required()
      .hex()
      .length(24)
      .message("Invalid discussionId");
  };

  const schema = Joi.object({
    content: Joi.string().required(),
    owner: ownerId().required(),
    discussion: discussionId().required(),
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
  },
  {
    timestamps: true,
  }
);

exports.Reply = mongoose.model("Reply", replySchema);

