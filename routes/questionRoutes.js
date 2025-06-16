const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController.js")
const auth = require('../middleware/auth.js');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin.js');

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/', auth, questionController.createQuestion); //not imp
router.put('/:id', auth, isOwnerOrAdmin('Question'), questionController.updateQuestion); //not imp
router.put('/:id/like', auth, questionController.increaseQuestionLikes);
router.put('/:id/dislike', auth, questionController.decreaseQuestionLikes);
router.delete('/:id', auth, isOwnerOrAdmin('Question'), questionController.deleteQuestion); //can't delete question, have to delete entire discussion


module.exports = router;