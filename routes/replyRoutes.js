const express = require('express');
const router = express.Router({ mergeParams: true });
const replyController = require('../controllers/replyController.js')
const auth = require('../middleware/auth.js');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin.js');

//nested
router.get('/', replyController.getAllReplies)
router.post("/", auth, replyController.createReply)
router.delete("/:id", auth, isOwnerOrAdmin('Reply'), replyController.deleteReply)

router.get("/:id", replyController.getReplyById)
router.put("/:id", auth, isOwnerOrAdmin('Reply'), replyController.updateReply)
router.put("/:id/like", auth, replyController.increaseReplyLikes)
router.put("/:id/dislike", auth, replyController.decreaseReplyLikes)

module.exports = router;