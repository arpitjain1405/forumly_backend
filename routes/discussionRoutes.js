const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const auth = require('../middleware/auth');

router.get("/", discussionController.getAllDiscussions);
router.get("/:id", discussionController.getDiscussionById);
router.get("/:id/followers", discussionController.getFollowersByDiscussionId);
router.post("/", auth, discussionController.createDiscussion);
router.post("/:id/follow", auth, discussionController.followDiscussion);
router.delete("/:id/unfollow", auth, discussionController.unfollowDiscussion);
router.put("/:id/categories", auth, discussionController.updateDiscussion);
router.delete("/:id", discussionController.deleteDiscussion);

module.exports = router;
