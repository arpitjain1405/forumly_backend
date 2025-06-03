const Category = require("../models/Category");
const { validateDiscussion, Discussion } = require("../models/Discussion");
const { Question } = require("../models/Question");

exports.getAllDiscussions = async (req, res) => {
  const discussions = Discussion.find();
  if (!discussions) return res.status(404).send("No discussion exist");
  res.send(discussions);
};

exports.getDiscussionById = async (req, res) => {
  const discussion = Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("No discussion exist");
  res.send(discussion);
};

exports.getFollowersByDiscussionId = async (req, res) => {
  const discussion = Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("No discussion exist");
  const followers = Discussion.findById(req.params.id)
    .populate("followers")
    .select("followers");
  if (!followers) return res.status(404).send("Sorry no followers");
  res.send(followers);
};

exports.createDiscussion = async (req, res) => {
  const { error } = validateDiscussion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { question, categories, user } = req.body;
  const categoryIds = [];

  for (const cat of categories) {
    let existing = await Discussion.findOne({ title: cat.title });
    if (existing) {
      categoryIds.push(existing._id);
    } else {
      if (!cat.discription)
        return res
          .status(400)
          .json({ error: `Missing description for category ${cat.title}` });

      let newCat = await Category.create({
        title: cat.title,
        discription: cat.discription,
      });
      categoryIds.push(newCat._id);
    }
  }
  const newQuestion = await Question.create({
    title: question.title,
    content: question.content,
    owner: user._id,
  });
  const newDiscussion = await Discussion.create({
    question: newQuestion._id,
    categories: categoryIds,
  });
  res.send(newDiscussion);
};

exports.followDiscussion = async (req, res) => {
  let discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("Discussion does not exist");

  discussion = await Discussion.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { followers: req.user._id },
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Followed successfully" });
};

exports.unfollowDiscussion = async (req, res) => {
  let discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("Discussion does not exist");

  discussion = await Discussion.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "unfollowed successfully" });
};

exports.updateDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("Discussion does not exist");

  const { error } = validateDiscussion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { question, categories, user } = req.body;
  const categoryIds = [];

  for (const cat of categories) {
    let existing = await Discussion.findOne({ title: cat.title });
    if (existing) {
      categoryIds.push(existing._id);
    } else {
      if (!cat.discription)
        return res
          .status(400)
          .json({ error: `Missing description for category ${cat.title}` });

      let newCat = await Category.create({
        title: cat.title,
        discription: cat.discription,
      });
      categoryIds.push(newCat._id);
    }
  }
  await Question.findByIdAndUpdate(
    discussion.question._id,
    {
      title: question.title,
      content: question.content,
    },
    {
      new: true,
    }
  );
  const updatedDiscussion = await Discussion.findByIdAndUpdate(
    req.params.id,
    {
      categories: categoryIds,
    },
    {
      new: true,
    }
  );
  res.send(updatedDiscussion);
};

exports.deleteDiscussion = async (req, res) => {
  let discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("Discussion does not exist");

  discussion = await Discussion.findByIdAndDelete(req.params.id);
  res.send(discussion);
};
