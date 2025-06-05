const { Category } = require("../models/Category");
const { validateDiscussion, Discussion } = require("../models/Discussion");
const { Question } = require("../models/Question");

exports.getAllDiscussions = async (req, res) => {
  const discussions = await Discussion.find();
  if (!discussions) return res.status(404).send("No discussion exist");
  res.send(discussions);
};

exports.getDiscussionById = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("No discussion exist");
  res.send(discussion);
};

exports.getFollowersByDiscussionId = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).send("No discussion exist");
  const followers = await Discussion.findById(req.params.id)
    .populate({
      path: "followers",
      select: "-password",
    })
    .select("followers");
  if (!followers) return res.status(404).send("Sorry no followers");
  res.send(followers);
};

exports.createDiscussion = async (req, res) => {
  const { error } = validateDiscussion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { question, categories } = req.body;
  const uniqueCategoryIds = new Set();

  for (let cat of categories) {
    const categoryTitle = cat.title.trim().toLowerCase();
    let existing = await Category.findOne({
      title: new RegExp(`^${categoryTitle}$`, "i"),
    });
    if (existing) {
      uniqueCategoryIds.add(existing._id.toString());
    } else {
      if (!cat.discription) {
        res
          .status(400)
          .json({ error: `Missing description for category ${cat.title}` });
      }
      let newCat = await Category.create({
        title: categoryTitle,
        discription: cat.discription,
      });
      uniqueCategoryIds.add(newCat._id.toString());
    }
  }
  const newQuestion = await Question.create({
    title: question.title,
    content: question.content,
    owner: req.user._id,
  });
  const newDiscussion = await Discussion.create({
    question: newQuestion._id,
    categories: Array.from(uniqueCategoryIds),
    owner: req.user._id,
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

  const { question, categories } = req.body;
  const uniqueCategoryIds = new Set();

  for (let cat of categories) {
    const categoryTitle = cat.title.trim().toLowerCase();
    let existing = await Category.findOne({
      title: new RegExp(`^${categoryTitle}$`, "i"),
    });

    if (existing) {
      uniqueCategoryIds.add(existing._id.toString());
    } else {
      if (!cat.discription)
        res
          .status(400)
          .json({ error: `Missing description for category ${cat.title}` });

      let newCat = await Category.create({
        title: categoryTitle,
        discription: cat.discription,
      });
      uniqueCategoryIds.add(newCat._id.toString());
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
      categories: Array.from(uniqueCategoryIds),
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
