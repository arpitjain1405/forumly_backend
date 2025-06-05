const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController')
const auth = require('../middleware/auth');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin');

router.get("/:id", replyController.getReplyById)
router.post("/", auth, replyController.createReply)
router.put("/:id", auth, isOwnerOrAdmin('Reply'), replyController.updateReply)
router.delete("/:id", auth, isOwnerOrAdmin('Reply'), replyController.deleteReply)
router.put("/:id/like", replyController.increaseReplyLikes)
router.put("/:id/dislike", replyController.decreaseReplyLikes)

module.exports = router;