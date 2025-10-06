const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');

router.post('/:quizId/submit', submitController.submitAnswers);

module.exports = router;
