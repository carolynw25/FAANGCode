require('dotenv').config();
const express = require('express');
const cors = require('cors'); //cross-origin requests enabled
const pool = require('./db'); // imports database connection

const app = express();
app.use(cors()); //allows frontend to call the backend
app.use(express.json()); //parses JSON requests

// Sample route to get users
app.get('/users', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users");
    conn.release(); //release connection back to pool
    res.json(rows); //sends results to frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
