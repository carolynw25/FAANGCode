// require('dotenv').config(); // load environment variables from .eng
// const mariadb = require('mariadb');

// // creates connection pool, manage multiple connections
// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   connectionLimit: 5,
// });

// //tests connection?
// async function testConnection() {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     console.log("Connected to MariaDB");
//   } catch (err) {
//     console.error("Database connection error:", err);
//   } finally {
//     if (conn) conn.end();
//   }
// }

// //runs test whenever the server is started
// testConnection();

// //exports pool so other files can use it
// module.exports = pool;
