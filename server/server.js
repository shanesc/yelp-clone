require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

// Load Middleware
app.use(express.json());

// Get all restaurants
app.get('/ap/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants');
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Get a restaurant
app.get('/ap/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Create a restaurant
app.post('/ap/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Update a restaurant
app.put('/ap/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [
        req.body.name,
        req.body.location,
        req.body.price_range,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Delete a restaurant
app.delete('/ap/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'DELETE FROM restaurants WHERE id = $1',
      [req.params.id]
    );
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
