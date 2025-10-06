const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const validateQuestion = require('../validations/validateQuestion');

router.post('/:quizId/questions', validateQuestion, questionController.addQuestion);
router.get('/:quizId/questions', questionController.getQuestionsForQuiz);

module.exports = router;
