// const mysql = require("mysql2");

// const db = mysql.createConnection({

  

//   host: "localhost",
//   user: "root",
//   password: "Faisal@1997",
//   database: "np_accounting"

// });

// db.connect((err)=>{

//   if(err){
//     console.log("Database connection error:", err);
//   }
//   else{
//     console.log("MySQL Connected");
//   }

// });

// module.exports = db;





const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;