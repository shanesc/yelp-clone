require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

const restaurants = [
  {
    name: 'McDonalds',
  },
  {
    name: 'Taco Bell',
  },
  {
    name: 'Wendys',
  },
];

app.use(express.json());

// Get all restaurants
app.get('/ap/v1/restaurants', async (req, res) => {
  const result = await db.query('SELECT * FROM restaurants');
  console.log(result);
  res.status(200).json({
    status: 'success',
    data: restaurants,
  });
});

// Get a restaurant

app.get('/ap/v1/restaurants/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    id: req.params.id,
    data: restaurants[0],
  });
});

// Create a restaurant
app.post('/ap/v1/restaurants', (req, res) => {
  res.status(201).json({
    status: 'success',
    data: restaurants,
  });
});

// Update a restaurant
app.put('/ap/v1/restaurants/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    id: req.params.id,
    data: req.body,
  });
});

// Delete a restaurant
app.delete('/ap/v1/restaurants/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
    id: req.params.id,
  });
});

port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
