const { validateReply, Reply } = require("../models/Reply");

exports.getReplyById = async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No Reply exist");
  res.send(reply);
};

exports.createReply = async (req, res) => {
  const { error } = validateReply(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const reply = await Reply.create({
    content: req.body.content,
    owner: req.body.owner,
    discussion: req.body.discussion,
  });
  res.send(reply);
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

  reply = await Reply.findByIdAndDelete(req.params.id);
  res.send(reply);
};

exports.increaseReplyLikes = async (req, res) => {
  let reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No reply exist");

  reply = await Reply.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { likes: 1 },
    },
    {
      new: true,
      timestamps: false,
    }
  );
  res.send(reply);
};

exports.decreaseReplyLikes = async (req, res) => {
  let reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).send("No reply exist");

  if (reply.likes > 0) {
    reply = await Reply.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { likes: -1 },
      },
      {
        new: true,
        timestamps: false,
      }
    );
    res.send(reply);
  }
  return res
    .status(200)
    .json({ message: "Already at 0 likes. Cannot dislike further." });
};
