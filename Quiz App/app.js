require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Import MongoDB connection module

const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const submitRoutes = require('./routes/submitRoutes');

app.use('/quizzes', quizRoutes);
app.use('/quizzes', questionRoutes);
app.use('/quizzes', submitRoutes);

// Health check endpoint
app.get('/', (req, res) => res.send('Quiz API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
