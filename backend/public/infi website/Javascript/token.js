const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Connect to MongoDB Databases
mongoose.connect('mongodb://localhost:27017/databaseA', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/databaseB', { useNewUrlParser: true, useUnifiedTopology: true });

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  token: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Blog Model
const blogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// Register a user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, passwordHash });
  await user.save();
  res.status(201).send(user);
});

// Login a user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    user.token = token; // Save token to user
    await user.save();
    res.send({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId;
    next();
  });
};

// Create a blog post (authenticated)
app.post('/blogs', authenticateToken, async (req, res) => {
  const blog = new Blog({ ...req.body, userId: req.userId });
  await blog.save();
  res.status(201).send(blog);
});

// Get all blogs by userId
app.get('/users/:userId/blogs', async (req, res) => {
  const blogs = await Blog.find({ userId: req.params.userId });
  res.send(blogs);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
