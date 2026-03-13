const express = require("express");
const router = express.Router();
const db = require("../config/db");


// GET USERS
router.get("/",(req,res)=>{

  db.query("SELECT * FROM users",(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json(result);

  });

});


// ADD USER
router.post("/",(req,res)=>{

  const {name,contact,username,password,role} = req.body;

  const sql = `
  INSERT INTO users(name,contact,username,password,role,status)
  VALUES (?,?,?,?,?,'active')
  `;

  db.query(sql,[name,contact,username,password,role],(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json({message:"User added"});

  });

});


// UPDATE USER
router.put("/:id",(req,res)=>{

  const {name,contact,username,role} = req.body;

  const sql = `
  UPDATE users
  SET name=?,contact=?,username=?,role=?
  WHERE id=?
  `;

  db.query(sql,[name,contact,username,role,req.params.id],(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json({message:"User updated"});

  });

});


// DELETE USER
router.delete("/:id",(req,res)=>{

  db.query("DELETE FROM users WHERE id=?",[req.params.id],(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json({message:"User deleted"});

  });

});


// BLOCK / UNBLOCK USER
router.put("/status/:id",(req,res)=>{

  const {status} = req.body;

  db.query(
    "UPDATE users SET status=? WHERE id=?",
    [status,req.params.id],
    (err,result)=>{

      if(err){
        return res.status(500).json(err);
      }

      res.json({message:"Status updated"});

    }
  );

});

module.exports = router;