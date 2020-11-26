require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

// Load Middleware
app.use(cors());
app.use(express.json());

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM restaurants ORDER BY name'
    );
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
    //TODO: Add sort functionality using param from front-end
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await db.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [req.params.id]
    );
    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: {
          ...restaurant.rows[0],
          reviews: reviews.rows,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
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
app.put('/api/v1/restaurants/:id', async (req, res) => {
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
app.delete('/api/v1/restaurants/:id', async (req, res) => {
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

// Add a review
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO reviews (restaurant_id, name, rating, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        req.params.id,
        req.body.name,
        req.body.rating,
        req.body.content,
      ]
    );
    res.status(201).json({
      status: 'success',
      data: {
        review: results.rows[0],
      },
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
