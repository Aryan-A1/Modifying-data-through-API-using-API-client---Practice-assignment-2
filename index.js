require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/menu', menuRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Menu API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});