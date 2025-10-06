const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const QuestionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  options: [OptionSchema],
  type: { type: String, enum: ['single-choice', 'multiple-choice', 'text'], required: true },
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model('Quiz', QuizSchema);
const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Quiz, Question };
