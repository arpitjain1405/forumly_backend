const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateBookmark = function (bookmark) {
  const schema = Joi.object({
    discussion: Joi.string()
      .hex()
      .length(24)
      .required()
      .message("Invalid discussionId"),
  });
  schema.validate(bookmark);
};

const bookmarkSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    discussions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

exports.Bookmark = mongoose.model("Bookmark", bookmarkSchema);
