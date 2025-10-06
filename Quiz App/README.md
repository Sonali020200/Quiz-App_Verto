# Quiz Application Backend API

## Description
Backend API to create quizzes, add questions, take quizzes, and score answers.

## Setup
- Install Node.js and MongoDB
- Run `npm install`
- Setup `.env` with MongoDB URI and PORT
- Start server: `npm start`
- Run tests: `npm test`

## API Endpoints
- POST /quizzes
- GET /quizzes
- POST /quizzes/:quizId/questions
- GET /quizzes/:quizId/questions
- POST /quizzes/:quizId/submit

See the cURL examples above for request format.

## Design
- RESTful API design
- Mongoose for MongoDB data modeling
- Input validation for question types and correct answers
- Scoring logic to compare submitted answers against correct ones
