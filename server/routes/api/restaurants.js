const express = require('express');
const router = express.Router();
const db = require('../../db');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT restaurants.id, restaurants.name, restaurants.location, restaurants.price_range, reviews.count, reviews.avg_rating FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id ORDER BY name'
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
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await db.query(
      'SELECT restaurants.id, restaurants.name, restaurants.location, restaurants.price_range, reviews.count, reviews.avg_rating FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
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
router.post('', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
router.post('/:id/addReview', async (req, res) => {
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

module.exports = router;
