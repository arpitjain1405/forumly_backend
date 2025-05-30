const express = require('express');
const router = express.Router();

router.get('/', questionRoutes.getAllQuestions);
router.get('/:id', questionRoutes.getQuestionById);
router.get('/:id/view', questionRoutes.increaseQuestionViews);
router.get('/:id/like', questionRoutes.increaseQuestionLikes);
router.get('/:id/dislike', questionRoutes.decreaseQuestionLikes);
router.post('/', questionRoutes.createQuestion);
router.put('/', questionRoutes.updateQuestion);
router.delete('/', questionRoutes.deleteQuestion);


module.exports = router;