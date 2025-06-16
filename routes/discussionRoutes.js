const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController.js");
const auth = require('../middleware/auth.js');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin.js');
const replyRoutes = require('../routes/replyRoutes.js');

router.get("/", discussionController.getAllDiscussions);
router.get("/:id", discussionController.getDiscussionById);
router.get("/:id/followers", discussionController.getFollowersByDiscussionId);
router.post("/", auth, discussionController.createDiscussion);
router.put('/:id/view', auth, discussionController.increaseDiscussionViews);
router.put('/:id/like', auth, discussionController.increaseDiscussionLikes);
router.put('/:id/dislike', auth, discussionController.decreaseDiscussionLikes);
router.post("/:id/follow", auth, discussionController.followDiscussion);
router.delete("/:id/unfollow", auth, discussionController.unfollowDiscussion);
router.put("/:id", auth, isOwnerOrAdmin('Discussion'), discussionController.updateDiscussion);
router.delete("/:id", auth, isOwnerOrAdmin('Discussion'), discussionController.deleteDiscussion);

router.use('/:discussionId/replies', replyRoutes);

module.exports = router;
