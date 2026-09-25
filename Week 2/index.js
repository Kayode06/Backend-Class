require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----

// Built-in JSON body parsing
app.use(express.json());

// Custom middleware: log every incoming request (method, path, timestamp)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve a static HTML page at "/"
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----

// GET / -> "Week 2 API!"
// (Served by the static index.html above. This JSON route is kept as a
// fallback / alternative for API clients like curl or Postman.)
app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user -> accepts { name, email }, responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Both "name" and "email" are required.' });
  }

  res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'User id is required.' });
  }

  res.send(`User ${id} profile`);
});

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ---- Centralized error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
