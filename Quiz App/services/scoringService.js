// Returns score by comparing answers with correct options
function scoreQuiz(questions, userAnswers) {
  let score = 0;

  questions.forEach(question => {
    const userAnswer = userAnswers.find(a => a.questionId === question._id.toString());
    if (!userAnswer) return;

    if (question.type === 'text') {
      // For text questions, no scoring logic implemented yet.
      // Could include text similarity, but skipping here.
    } else {
      const correctOptionIds = question.options
        .filter(o => o.isCorrect)
        .map(o => o._id.toString())
        .sort();
      const selectedOptionIds = userAnswer.selectedOptionIds
        .map(id => id.toString())
        .sort();

      if (JSON.stringify(correctOptionIds) === JSON.stringify(selectedOptionIds)) {
        score++;
      }
    }
  });

  return score;
}

module.exports = { scoreQuiz };
