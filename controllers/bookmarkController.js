const { Bookmark } = require("../models/Bookmark.js");
const { Discussion } = require("../models/Discussion.js");

exports.getUserBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.find({ owner: req.user._id })
    .select("discussions")
    .populate("discussions");
  if (!bookmarks) return res.status(404).send("No bookmarks");
  res.status(200).send(bookmarks);
};

exports.getBookmarkById = async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id);
  if (!bookmark) return res.status(404).send("Bookmark doesn't exist");
  res.send(bookmark);
};

exports.addBookmark = async (req, res) => {
  const discussion = await Discussion.findById(req.params.discussionId);
  if (!discussion) return res.status(404).send("No discussion found");

  let bookmark = await Bookmark.findOne({ owner: req.user._id, discussion: req.params.id });
  if(bookmark) return res.status(400).send("Already Bookmarked");

  bookmark = await Bookmark.create({
    owner: req.user._id,
    discussion: req.params.id
  })
};

exports.removeBookmark = async (req, res) => {
  const discussion = await Discussion.findById(req.params.discussionId);
  if (!discussion) return res.status(404).send("No discussion found");

  let bookmark = await Bookmark.findOne({ owner: req.user._id, discussion:req.params.id });
  if(!bookmark) return res.status(400).send("You haven't bookmarked it");

  bookmark = await Bookmark.findByIdAndDelete(bookmark._id);
  res.send(bookmark);
};
