require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/expenses', expenseRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});