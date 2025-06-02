const { validateCategory, Category } = require("../models/Category");
const { Discussion } = require("../models/Discussion");

exports.getAllCategory = async (req, res) => {
  const categories = await Category.find();
  if (!categories) return res.status(404).send("No Category exist");
  res.send(categories);
};

exports.getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("No Category exist");
  res.send(category);
};

exports.getDiscussionsByCategoryId = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("No category exist");

  const discussions = await Discussion.find({ categories: req.params.id });
  res.send(discussions);
};

//Admins only
exports.createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Reply.create({
    title: req.body.title,
    description: req.body.discription,
    discussion: [],
  });
  res.send(category);
};

//Admins only
exports.updateCategory = async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("No reply exist");

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  category = await Reply.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      discription: req.body.discription,
    },
    { new: true }
  );
  res.send(reply);
};

//Admins only
exports.deleteCategory = async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("No reply exist");

  category = await Reply.findByIdAndDelete(req.params.id);
  res.send(category);
};
