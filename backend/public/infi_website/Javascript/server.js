// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String, // Hash passwords before saving
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/login', async (req, res) => {
  // Handle login logic
  const { email, password } = req.body;
  // Find user in database and validate password
});

app.post('/api/signup', async (req, res) => {
  // Handle signup logic
  const { firstName, lastName, email, phone, password } = req.body;
  // Save user to database
});

// Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
