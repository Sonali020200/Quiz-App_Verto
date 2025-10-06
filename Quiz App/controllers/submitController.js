const { Question } =require('../models/quizModel');
const { scoreQuiz } = require('../services/scoringService');

exports.submitAnswers = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // Array [{ questionId, selectedOptionIds }]

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers must be an array' });
    }
    
    const questions = await Question.find({ quizId });

    const total = questions.length;
    const score = scoreQuiz(questions, answers);

    res.json({ score, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
