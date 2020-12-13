const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../../db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    const users = results.rows;
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting users');
  }
});

// Get a user
router.get('/:id', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [req.params.id]
    );
    const user = results.rows[0];
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting user');
  }
});

// Create a user
router.post('', async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    await db.query('BEGIN TRANSACTION');
    const results = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;',
      [req.body.name, req.body.email]
    );
    await db.query(
      'INSERT INTO logins (email, hash) VALUES ($1, $2)',
      [results.rows[0].email, hash]
    );
    await db.query('COMMIT TRANSACTION');
    res.status(200).json({
      status: 'success',
      msg: 'User created',
      user: results.rows[0],
    });
  } catch (err) {
    await db.query('ROLLBACK TRANSACTION');
    console.log(err);
    res.status(400).send('Create user failed');
  }
});

// Sign in a user
router.post('/signin', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM logins WHERE email = $1',
      [req.body.email]
    );
    const login = await results.rows[0];
    const isValid = bcrypt.compareSync(req.body.password, login.hash);
    if (isValid) {
      const userResults = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [req.body.email]
      );
      const user = await userResults.rows[0];
      res.status(200).json({
        status: 'success',
        msg: 'Login successful',
        user,
      });
    } else {
      res.status(400).json({
        msg: 'Login failed',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: 'Login failed',
    });
  }
});

// Toggle a favorite
router.post('/:id', async (req, res) => {
  try {
    let results;
    if (req.body.addFavorite) {
      results = await db.query(
        'UPDATE users SET favorites = (SELECT ARRAY_APPEND((SELECT favorites FROM users WHERE id = $1), $2)) WHERE id = $1 RETURNING *',
        [req.params.id, req.body.restaurant_id]
      );
    } else if (req.body.removeFavorite) {
      results = await db.query(
        'UPDATE users SET favorites = (SELECT ARRAY_REMOVE((SELECT favorites FROM users WHERE id = $1), $2)) WHERE id = $1 RETURNING *',
        [req.params.id, req.body.restaurant_id]
      );
    }

    res.status(200).json({
      satus: 'success',
      data: results.rows[0].favorites,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
