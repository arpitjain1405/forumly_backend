const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const auth = require('../middleware/auth');

router.get('/', auth, bookmarkController.getUserBookmarks);
router.get('/:id', bookmarkController.getBookmarkById);
router.post('/:discussionId', auth, bookmarkController.addBookmark),
router.delete('/:discussionId', auth, bookmarkController.removeBookmark)


module.exports = router;