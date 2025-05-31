const mongoose = require("mongoose");
const Question = require("../models/Question");

exports.getAllQuestions = async (req, res) => {
  const { sort, order } = req.query;

  const sortFilter = {};

  if (sort === "views") {
    sortFilter.views = order === "desc" ? -1 : 1;
  }
  if (sort === "likes") {
    sortFilter.likes = order === "desc" ? -1 : 1;
  }

  const questions = Question.find().sort(sortFilter);
  if (!questions) return res.status(404).send("No question exist");
  res.send(questions);
};

exports.getQuestionById = async (req, res) => {
  const question = Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");
  res.send(question);
};

exports.createQuestion = async (req, res) => {
  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = Question.create({
    title: req.body.title,
    content: req.body.content,
    owner: req.body.owner,
  });

  res.send(question);
};

exports.updateQuestion = async (req, res) => {
  let question = Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  question = Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(question);
};

exports.deleteQuestion = async (req, res) => {
  let question = Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  question = Question.findByIdAndDelete(req.params.id);
  res.send(question);
};

exports.increaseQuestionViews = async (req, res) => {
  let question = Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  question = Question.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { views: 1 },
    },
    {
      timestamps: false,
    }
  );
};

exports.increaseQuestionLikes = async (req, res) => {
  let question = Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  question = Question.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { likes: 1 },
    },
    {
      timestamps: false,
    }
  );
};

exports.decreaseQuestionLikes = async (req, res) => {
  let question = Question.findById(req.params.id);
  if (!question) return res.status(404).send("No question exist");

  if (parseInt(question.likes) > 0) {
    question = Question.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { likes: -1 },
      },
      {
        timestamps: false,
      }
    );
  }
};
