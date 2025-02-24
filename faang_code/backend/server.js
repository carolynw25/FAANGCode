// require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors'); //cross-origin requests enabled
//const pool = require('./db'); // imports database connection

const app = express();
app.use(cors()); //allows frontend to call the backend
app.use(express.json()); //parses JSON requests

// Old way, but mariadb might require pooling. This is mysql way
// const db = mariadb.createConnection ({
//   host: 'localhost',
//   user: 'user1',
//   password: 'password1',
//   database: 'faangUsers',
// })
// .then(conn => {
//   // Use the connection object (conn) to execute queries
//   console.log('Connected to MariaDB!');
//   conn.close(); // Close the connection when done
// })
// .catch(err => {
//   console.error('Error connecting to MariaDB:', err);
// });

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
    const conn = await pool.getConnection();
    const result = await conn.query(sql, values);
    conn.release();

    //mariaDB returns BigInt value, JS strinify cannot handle BigInt
    const serializedResult = JSON.parse(JSON.stringify(result, (_, value) =>
      typeof value === "BigInt" ? value.toString() : value
    ));

    res.json({ message: "Account created successfully!", result });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
      if (conn) conn.release(); // Release connection back to the pool, prevent connection leaks
  }
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

//original w/ connection w/out pooling
// app.post('/create-account', (req, res) => {
//   const sql = "INSERT INTO user_signup ('firstName', 'lastName', 'username', 'password', 'email') VALUES (?)";
//   const values = [
//     req.body.firstName,
//     req.body.lastName,
//     req.body.username,
//     req.body.password,
//     req.body.email,
//   ] 
//   db.query(sql, [values], (err, data) => {
//     if(err) {
//       return res.json("Error");
//     }
//     return res.json(data);
//   })
// })

// Start server
//const PORT = process.env.PORT || 5001;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(8081, ()=> {
  console.log("listening")
})
