const { Question } = require('../models/quizModel');

exports.addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options, type } = req.body;

    const question = new Question({ quizId, text, options, type });
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuestionsForQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).select('-options.isCorrect');
    // Remove isCorrect from options before sending response
    const questionsResponse = questions.map(q => {
      return {
        _id: q._id,
        text: q.text,
        type: q.type,
        options: q.options.map(o => ({ _id: o._id, text: o.text }))
      };
    });
    res.json(questionsResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
