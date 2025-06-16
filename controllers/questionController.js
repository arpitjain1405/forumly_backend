const { Question, validateQuestion } = require("../models/Question.js");

exports.getAllQuestions = async (req, res) => {
  const { sort, order } = req.query;

  const sortFilter = {};

  if (sort === "views") {
    sortFilter.views = order === "desc" ? -1 : 1;
  }
  if (sort === "likes") {
    sortFilter.likes = order === "desc" ? -1 : 1;
  }

  const questions = await Question.find().sort(sortFilter);
  if (!questions) return res.status(404).send("No question exist");
  res.send(questions);
};

exports.getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");
  res.send(question);
};

exports.createQuestion = async (req, res) => {
  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.create({
    title: req.body.title,
    content: req.body.content,
    owner: req.user._id,
  });

  res.status(201).send(question);
};

exports.updateQuestion = async (req, res) => {
  let question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(question);
};

exports.deleteQuestion = async (req, res) => {
  let question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  question = await Question.findByIdAndDelete(req.params.id);
  res.send(question);
};

exports.increaseQuestionLikes = async (req, res) => {
  let question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likedBy: req.user._id },
    },
    {
      timestamps: false,
      new: true,
    }
  );

  question.likes = question.likedBy.length;
  question = await question.save();
  res.send(question);
};

exports.decreaseQuestionLikes = async (req, res) => {
  let question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likedBy: req.user._id },
    },
    {
      timestamps: false,
      new: true,
    }
  );

  question.likes = question.likedBy.length;
  question = await question.save();
  res.send(question);
};
