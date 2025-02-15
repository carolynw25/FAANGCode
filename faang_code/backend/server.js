// require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors'); //cross-origin requests enabled
//const pool = require('./db'); // imports database connection

const app = express();
app.use(cors()); //allows frontend to call the backend
//app.use(express.json()); //parses JSON requests

const db = mariadb.createConnection ({
  host: 'localhost',
  user: 'user1',
  password: 'password1',
  database: 'faangUsers',
})
.then(conn => {
  // Use the connection object (conn) to execute queries
  console.log('Connected to MariaDB!');
  conn.close(); // Close the connection when done
})
.catch(err => {
  console.error('Error connecting to MariaDB:', err);
});
// Sample route to get users
/*
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
*/

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO user_signup ('firstName', 'lastName', 'username', 'password', 'email') VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.username,
    req.body.password,
    req.body.email,
  ] 
  db.query(sql, [values], (err, data) => {
    if(err) {
      return res.json("Error");
    }
    return res.json(data);
  })
})

// Start server
const PORT = process.env.PORT || 5001;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, ()=> {
  console.log("listening")
})
