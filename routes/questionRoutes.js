const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController")

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.put('/:id/view', questionController.increaseQuestionViews);
router.put('/:id/like', questionController.increaseQuestionLikes);
router.put('/:id/dislike', questionController.decreaseQuestionLikes);
router.delete('/:id', questionController.deleteQuestion);


module.exports = router;