const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController')

router.get("/:id", replyController.getReplyById)
router.post("/:id", replyController.createReply)
router.put("/:id", replyController.updateReply)
router.delete("/:id", replyController.deleteReply)
router.put("/:id/like", replyController.increaseReplyLikes)
router.put("/:id/dislike", replyController.decreaseReplyLikes)

module.exports = router;