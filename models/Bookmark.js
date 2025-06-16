const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

exports.Bookmark = mongoose.model("Bookmark", bookmarkSchema);
