const { body, validationResult } = require('express-validator');

const validateQuestion = [
  body('text')
    .isString().withMessage('Question text must be a string')
    .notEmpty().withMessage('Question text is required'),

  body('type')
    .isIn(['single-choice', 'multiple-choice', 'text']).withMessage('Invalid question type'),

  body('options')
    .custom((options, { req }) => {
      if (req.body.type === 'text') {
        // Text question should have no options
        if (options && options.length > 0) {
          throw new Error('Text typed question should not have options');
        }
      } else {
        if (!options || !Array.isArray(options) || options.length < 2) {
          throw new Error('Options must be an array with at least two items for choice questions');
        }
        const correctCount = options.filter(o => o.isCorrect).length;
        if (req.body.type === 'single-choice' && correctCount !== 1) {
          throw new Error('Single choice question must have exactly one correct option');
        }
        if (req.body.type === 'multiple-choice' && correctCount < 1) {
          throw new Error('Multiple choice question must have at least one correct option');
        }
        for (const opt of options) {
          if (typeof opt.text !== 'string' || opt.text.trim() === '') {
            throw new Error('Each option must have non-empty text');
          }
        }
      }
      return true;
    }),

  body('text')
    .custom((text, { req }) => {
      if (req.body.type === 'text' && text.length > 300) {
        throw new Error('Text question limit: max 300 characters');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateQuestion;
