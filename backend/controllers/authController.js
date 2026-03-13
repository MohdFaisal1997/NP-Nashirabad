const db = require("../config/db");

exports.login = (req,res)=>{

  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(sql,[username,password],(err,result)=>{

    if(err){
      return res.status(500).json({message:"Server error"});
    }

    if(result.length === 0){
      return res.status(401).json({message:"Invalid username or password"});
    }

    const user = result[0];

    if(user.status === "blocked"){
      return res.status(403).json({message:"User is blocked"});
    }

    res.json({
      user:user
    });

  });

};