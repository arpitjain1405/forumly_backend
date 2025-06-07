const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const auth = require('../middleware/auth');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin');
const replyRoutes = require('../routes/replyRoutes');

router.get("/", discussionController.getAllDiscussions);
router.get("/:id", discussionController.getDiscussionById);
router.get("/:id/followers", discussionController.getFollowersByDiscussionId);
router.post("/", auth, discussionController.createDiscussion);
router.post("/:id/follow", auth, discussionController.followDiscussion);
router.delete("/:id/unfollow", auth, discussionController.unfollowDiscussion);
router.put("/:id", auth, isOwnerOrAdmin('Discussion'), discussionController.updateDiscussion);
router.delete("/:id", auth, isOwnerOrAdmin('Discussion'), discussionController.deleteDiscussion);

router.use('/:discussionId/replies', replyRoutes);

module.exports = router;
