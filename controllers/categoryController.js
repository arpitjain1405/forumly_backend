const { validateCategory, Category } = require("../models/Category.js");
const { Discussion } = require("../models/Discussion.js");

exports.getAllCategories = async (req, res) => {
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

  const title = req.body.title.trim().toLowerCase();
  const existing = await Category.findOne({ title: new RegExp(`^${title}$`, "i") });
  if(existing) return res.status(400).send("Category already exist"); 

  const category = await Category.create({
    title: title,
    description: req.body.description,
  });
  res.status(201).send(category);
};

//Admins only
exports.updateCategory = async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("No category exist");

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = req.body.title.trim().toLowerCase();
  const existing = await Category.findOne({ title: new RegExp(`^${title}$`, "i") });
  if(existing) return res.status(400).send("Category title already exist."); 

  category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      title: title,
      description: req.body.description,
    },
    { new: true }
  );
  res.send(category);
};

//Admins only
exports.deleteCategory = async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("No reply exist");

  category = await Category.findByIdAndDelete(req.params.id);
  res.send(category);
};
