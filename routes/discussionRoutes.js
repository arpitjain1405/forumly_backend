const express = require("express");
const router = express.Router();

router.get('/', discussionController.getAllDiscussions)
router.get('/:id', discussionController.getDiscussionById)
router.get('/:id/followers', discussionController.getFollowersByDiscussionId)
router.post('/', discussionController.createDiscussion)
router.post('/:id/follow', discussionController.followDiscussion)
router.delete('/:id/unfollow', discussionController.unfollowDiscussion)
router.put('/:id/categories', discussionController.updateDiscussion)
router.delete('/:id', discussionController.deleteDiscussion)

module.exports = router;