const { Discussion } = require("../models/Discussion.js");
const { validateReply, Reply } = require("../models/Reply.js");

exports.getAllReplies = async (req, res) => {
  const discussionId = req.params.discussionId;
  const discussion = await Discussion.findById(discussionId);
  if (!discussion) return res.status(404).send("No discussion found");

  const replies = await Reply.find({ discussion: discussionId })
    .populate("owner", "name -_id")
    .lean();

  const replyMap = {};
  replies.forEach((reply) => {
    reply.children = [];
    replyMap[reply._id.toString()] = reply;
  });

  const replyTree = [];
  replies.forEach((reply) => {
    if (reply.parentReply) {
      const parent = replyMap[reply.parentReply];
      if (parent) {
        parent.children.push(reply);
      }
    } else {
      replyTree.push(reply);
    }
  });
  res.status(200).json(replyTree);
};

exports.getReplyById = async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No Reply exist");
  res.send(reply);
};

exports.createReply = async (req, res) => {
  const discussionId = req.params.discussionId;
  const parentReplyId = req.body.parentReplyId;

  let discussion = await Discussion.findById(discussionId);
  if (!discussion) return res.status(404).send("No discussion found");

  const { error } = validateReply(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (parentReplyId) {
    const parentReply = await Reply.findById(parentReplyId);
    if (!parentReply) return res.status(400).send("Parent reply doesn't exist");

    if (!(parentReply.discussion.toString() === discussionId.toString())) {
      return res.status(400).send("Reply doesn't belong to the discussion");
    }
  }

  const reply = await Reply.create({
    content: req.body.content,
    owner: req.user._id,
    discussion: discussionId,
    parentReply: parentReplyId || null,
  });

  discussion.replies.push(reply._id);
  discussion.replyCount += 1;
  await discussion.save();

  res.status(201).send(reply);
};

exports.updateReply = async (req, res) => {
  let reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No reply exist");

  const { error } = validateReply(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  reply = await Reply.findByIdAndUpdate(
    req.params.id,
    {
      content: req.body.content,
    },
    { new: true }
  );
  res.send(reply);
};

exports.deleteReply = async (req, res) => {
  let reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No reply exist");

  const discussionId = req.params.discussionId;
  let discussion = await Discussion.findById(discussionId);
  if (!discussion) return res.status(404).send("No discussion found");

  if (!(reply.discussion.toString() === discussionId.toString()))
    return res.status(400).send("Reply doesn't belong to the discussion");

  discussion.replies = discussion.replies.filter((id) => !id.equals(reply._id));
  discussion.replyCount -= 1;
  await discussion.save();

  reply = await Reply.findByIdAndDelete(req.params.id);
  res.send(reply);
};

exports.increaseReplyLikes = async (req, res) => {
  let reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No reply exist");

  reply = await Reply.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likedBy: req.user._id },
    },
    {
      new: true,
      timestamps: false,
    }
  );

  reply.likes = reply.likedBy.length;
  reply = await reply.save();
  res.send(reply);
};

exports.decreaseReplyLikes = async (req, res) => {
  let reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No reply exist");

  reply = await Reply.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likedBy: req.user._id },
    },
    {
      new: true,
      timestamps: false,
    }
  );

  reply.likes = reply.likedBy.length;
  reply = await reply.save();
  res.send(reply);
};
