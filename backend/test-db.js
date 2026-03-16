// require("dotenv").config();
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("Connection Failed:", err);
//     return;
//   }

//   console.log("✅ MySQL Connected Successfully!");

//   connection.query("SELECT NOW() AS time", (err, result) => {
//     if (err) {
//       console.log("Query error:", err);
//     } else {
//       console.log("Database Time:", result);
//     }

//     connection.end();
//   });
// });