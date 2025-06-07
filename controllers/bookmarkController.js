const { Bookmark } = require("../models/Bookmark");
const { Discussion } = require("../models/Discussion");

exports.getUserBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.findOne({ owner: req.user._id })
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

  let bookmarkDoc = await Bookmark.findOne({ owner: req.user._id });
  if (bookmarkDoc) {
    const alreadyBookmarked = bookmarkDoc.discussions.some((id) =>
      id.equals(req.params.discussionId)
    );
    if (!alreadyBookmarked) {
      bookmarkDoc.discussions.push(req.params.discussionId);
      await bookmarkDoc.save();
      return res.status(201).json({ message: "Successfuly added bookmark" });
    }
    return res.status(400).send("Already Bookmarked");
  } else {
    bookmarkDoc = await Bookmark.create({
      owner: req.user._id,
      discussions: [req.params.discussionId],
    });
    return res.status(201).json({ message: "Successfuly added bookmark" });
  }
};

exports.removeBookmark = async (req, res) => {
  const discussion = await Discussion.findById(req.params.discussionId);
  if (!discussion) return res.status(404).send("No discussion found");

  let bookmarkDoc = await Bookmark.findOne({ owner: req.user._id });
  if (bookmarkDoc) {
    bookmarkDoc.discussions = bookmarkDoc.discussions.filter(
      (id) => !id.equals(req.params.discussionId)
    );
    await bookmarkDoc.save();
    return res.status(200).json({ message: "Successfuly removed bookmark" });
  }
  return res.json({ message: "User has no Bookmarks" });
};
