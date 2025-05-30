const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    content: String,
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
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
