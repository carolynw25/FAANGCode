// require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors'); //cross-origin requests enabled
//const pool = require('./db'); // imports database connection

const app = express();
app.use(cors()); //allows frontend to call the backend
app.use(express.json()); //parses JSON requests

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'user1',
  password: 'password1',
  database: 'faangUsers',
  connectionLimit: 50
});

// Connection check
pool.getConnection()
  .then(conn => {
    console.log('Connected to MariaDB!');
    conn.release(); // Release connection back to pool
  })
  .catch(err => {
    console.error('Error connecting to MariaDB:', err);
  });

// POST request that uses pool
app.post('/create-account', async (req, res) => {
  const sql = "INSERT INTO user_signup (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.username,
    req.body.password,
    req.body.email,
  ];

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, values);
    conn.release();

    //mariaDB returns BigInt value, JS strinify cannot handle BigInt
    // Convert BigInt fields (like insertId) manually
    // chatgpt solution to bigint issue
    if (typeof result.insertId === "bigint") {
      result.insertId = result.insertId.toString();
    }

    res.json({ message: "Account created successfully!", result });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
      if (conn) conn.release(); // Release connection back to the pool, prevent connection leaks
  }
});

app.post('/login', async (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;

  const sql = "SELECT username, password FROM user_signup WHERE username = ?";
  let conn;
  try {
    conn = await pool.getConnection();
    //query results in an array, first element of array contains username and password
    //query just username to filter bc will hash password later
    const result = await conn.query(sql, [req.body.username]);
    conn.release();

    if (result.length > 0) {
      //password match check
      if (result[0].password === req.body.password) {
        res.json({ message: "Login successful!", user: { username: result[0].username } });
      } else {
        res.status(401).json({error: "Invalid password"});
      }
    } else {
        res.status(401).json({error: "User not found"});
      }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
      if (conn) conn.release(); // Release connection back to the pool, prevent connection leaks
  }
});

// Start server
//const PORT = process.env.PORT || 5001;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(8081, ()=> {
  console.log("listening")
})
