// require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors'); //cross-origin requests enabled
//const pool = require('./db'); // imports database connection

const app = express();
app.use(cors()); //allows frontend to call the backend
//app.use(express.json()); //parses JSON requests

const db = mariadb.createConnection() ({
  host: "127.0.0.1",
  user: "user1",
  password: "password1",
  database: "faangUsers",
})
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
  const sql = "INSERT INTO login ('name', 'email', 'password') VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ] 
  db.query(sql, [values], (err, data) => {
    if(err) {
      return res.json("Error");
    }
    return res.json(data);
  })
})

// Start server
const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, ()=> {
  console.log("listening")
})
