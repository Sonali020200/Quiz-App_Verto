const { scoreQuiz } = require('../services/scoringService');

describe('Scoring Service', () => {
  const questions = [
    {
      _id: 'q1',
      type: 'single-choice',
      options: [
        { _id: 'o1', isCorrect: false },
        { _id: 'o2', isCorrect: true }
      ]
    },
    {
      _id: 'q2',
      type: 'multiple-choice',
      options: [
        { _id: 'o3', isCorrect: true },
        { _id: 'o4', isCorrect: true },
        { _id: 'o5', isCorrect: false }
      ]
    }
  ];

  test('correctly scores single and multiple choice answers', () => {
    const userAnswers = [
      { questionId: 'q1', selectedOptionIds: ['o2'] },
      { questionId: 'q2', selectedOptionIds: ['o3', 'o4'] }
    ];
    const score = scoreQuiz(questions, userAnswers);
    expect(score).toBe(2);
  });

  test('zero score when answers are incorrect or incomplete', () => {
    const userAnswers = [
      { questionId: 'q1', selectedOptionIds: ['o1'] },
      { questionId: 'q2', selectedOptionIds: ['o3'] }
    ];
    const score = scoreQuiz(questions, userAnswers);
    expect(score).toBe(0);
  });
});
