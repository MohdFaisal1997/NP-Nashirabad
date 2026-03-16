const mysql = require("mysql2");

const db = mysql.createConnection({

  host: "MYSQL8002.site4now.net",
  user: "ac6b1d_account",
  password: "Faisal@1997",
  database: "db_ac6b1d_account"

  // host: "localhost",
  // user: "root",
  // password: "Faisal@1997",
  // database: "np_accounting"

});

db.connect((err)=>{

  if(err){
    console.log("Database connection error:", err);
  }
  else{
    console.log("MySQL Connected");
  }

});

module.exports = db;