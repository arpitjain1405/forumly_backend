const express = require('express');
const router = express.Router({ mergeParams: true });
const replyController = require('../controllers/replyController')
const auth = require('../middleware/auth');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin');

router.get('/', replyController.getAllReplies)
router.post("/", auth, replyController.createReply)
router.delete("/:id", auth, isOwnerOrAdmin('Reply'), replyController.deleteReply)

router.get("/:id", replyController.getReplyById)
router.put("/:id", auth, isOwnerOrAdmin('Reply'), replyController.updateReply)
router.put("/:id/like", replyController.increaseReplyLikes)
router.put("/:id/dislike", replyController.decreaseReplyLikes)

module.exports = router;