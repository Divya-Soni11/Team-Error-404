require('dotenv').config(); // Loads environmental variables first thing
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows your backend to read JSON inputs from the user

// Test Route
app.get('/', (req, res) => {
  res.send('Backend Environment Setup Complete and Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server successfully rolling on : http://localhost:${PORT}`);
});