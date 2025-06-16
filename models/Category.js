const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateCategory = function (category) {
  const schema = Joi.object({
    title: Joi.string().required().trim().min(1),
    description: Joi.string().required().min(10).trim(),
  });

  return schema.validate(category);
};

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
    },
  },
  {
    timestamps: true,
  }
);

exports.Category = mongoose.model("Category", categorySchema);

