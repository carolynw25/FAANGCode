// require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors'); //cross-origin requests enabled
const bcrypt = require('bcryptjs'); // password hashing

const app = express();
app.use(cors()); //allows frontend to call the backend
app.use(express.json()); //parses JSON requests

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'user1',
  password: 'password1',
  database: 'faangUsers',
  connectionLimit: 50,
  //bigNumberStrings: true
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
//Note: the '?' is a placeholder. It is used to prevent SQL injections
app.post('/create-account', async (req, res) => {
  const sql = "INSERT INTO user_signup (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)";

  let conn;
  try {
    const saltRounds = 10; //higher = better more security, but slower
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      hashPass,
      req.body.email,
    ];
    conn = await pool.getConnection();
    const result = await conn.query(sql, values);
    conn.release();

    //mariaDB returns BigInt value, JS strinify cannot handle BigInt
    // Convert BigInt fields (like insertId) manually
    // chatgpt solution to bigint issue

    //This isn't needed anymore as the bigNumber configuration in the pool connection 
    //will automatically do this
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

  const sql = "SELECT id, username, password FROM user_signup WHERE username = ?";
  let conn;
  try {
    conn = await pool.getConnection();
    //query results in an array, first element of array contains username and password
    //query just username to filter bc will hash password later
    const result = await conn.query(sql, [req.body.username]);
    conn.release();
    
    if (result.length > 0) {
      //password match check
      //without bcrypt: "result[0].password === req.body.password", now use bcrypt.compare
      if (await bcrypt.compare(req.body.password, result[0].password)) {
        res.json({ message: "Login successful!", user: { username: result[0].username }, id: result[0].id });
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

app.post('/save-extension-data', async (req, res) => {
  const sql = `
    INSERT INTO user_data (id) VALUES (?)
    ON DUPLICATE KEY UPDATE 
      totalNumHintsEasy = totalNumHintsEasy + ?,
      totalNumHintsMedium = totalNumHintsMedium + ?,
      totalNumHintsHard = totalNumHintsHard + ?,
      totalDebug = totalDebug + ?,
      totalComplexity = totalComplexity + ?
  `;

  let conn;
  try {
    const { id, totalNumHintsEasy, totalNumHintsMedium, totalNumHintsHard, totalDebug, totalComplexity } = req.body;

    const values = [
      id,
      totalNumHintsEasy, 
      totalNumHintsMedium, 
      totalNumHintsHard,
      totalDebug,
      totalComplexity
    ];

    conn = await pool.getConnection();
    const result = await conn.query(sql, values);
    console.log("Database result:", result); 
    conn.release();
    
    if (typeof result.insertId === "bigint") {
      result.insertId = result.insertId.toString();
    }
    res.json({ message: "User data is updated successfully!", result });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
    if (conn) conn.release();
  }
});

//getting the data to display on dashboard
//using React's useState and useEffect to fetch data and update the dashboard
app.get('/get-user-info', async (req, res) => {
  const { id } = req.query; // Get id from query parameters

  if (!id) { //checks to ensure it is not null or invalid. Would throw error
    return res.status(400).json({ error: "User ID required" });
  }

  const sql = "SELECT firstName, lastName, username, totalDebug, totalComplexity, totalNumHintsEasy, totalNumHintsMedium, totalNumHintsHard FROM user_signup JOIN user_data ON user_signup.id = user_data.id WHERE user_signup.id = ?";
  
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, [id]);
    conn.release();

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
    if (conn) conn.release();
  }
});



// Start server
//const PORT = process.env.PORT || 5001;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(8081, ()=> {
  console.log("listening")
})

//endpoint for profile page to get user info
app.get('/get-user', async (req, res) => {
  const { username } = req.query;
  const sql = "SELECT firstName, lastName, username, email FROM user_signup WHERE username = ?";

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, [username]);
    conn.release();

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
    if (conn) conn.release();
  }
});

//endpoint to delete user's acct
app.delete('/delete-user', async (req, res) => {
  const { username } = req.query;
  const sql = "DELETE FROM user_signup WHERE username = ?";

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, [username]);
    conn.release();

    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  } finally {
    if (conn) conn.release();
  }
});