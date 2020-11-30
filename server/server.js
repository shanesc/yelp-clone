require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Load Middleware
app.use(cors());
app.use(express.json());

// Restaurants API Routes
app.use('/api/v1/restaurants', require('./routes/api/restaurants'));

// Users API Routes
app.use('/api/v1/users', require('./routes/api/users'));

// Start server
port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
