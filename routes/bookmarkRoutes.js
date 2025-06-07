const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/', getUserBookmarks);
router.get('/:id', getBookmarkById);
router.post('/', addBookmark),
router.delete('/', removeBookmark)


module.exports = router;