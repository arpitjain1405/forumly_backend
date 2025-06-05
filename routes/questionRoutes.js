const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController")
const auth = require('../middleware/auth');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin');

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/', auth, questionController.createQuestion); //not imp
router.put('/:id', auth, isOwnerOrAdmin('Question'), questionController.updateQuestion); //not imp
router.put('/:id/view', questionController.increaseQuestionViews);
router.put('/:id/like', questionController.increaseQuestionLikes);
router.put('/:id/dislike', questionController.decreaseQuestionLikes);
router.delete('/:id', auth, isOwnerOrAdmin('Question'), questionController.deleteQuestion); //can't delete question, have to delete entire discussion


module.exports = router;