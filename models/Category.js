const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateCategory = function (category) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required().min(10),
  });

  return schema.validate(category);
};

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
