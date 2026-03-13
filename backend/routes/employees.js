const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* GET EMPLOYEES */

router.get("/", (req,res)=>{

  db.query(
    "SELECT * FROM employees ORDER BY id DESC",
    (err,result)=>{

      if(err){
        console.log(err);
        return res.status(500).json({message:"Database error"});
      }

      res.json(result);

  });

});


/* ADD EMPLOYEE */

router.post("/",(req,res)=>{

  const {
    name,
    contact,
    designation,
    email,
    salary,
    bankAccount,
    ifsc,
    bankName
  } = req.body;

  const sql = `
  INSERT INTO employees
  (name,contact,designation,email,salary,bankAccount,ifsc,bankName)
  VALUES (?,?,?,?,?,?,?,?)
  `;

  db.query(sql,[
    name,
    contact,
    designation,
    email,
    salary,
    bankAccount,
    ifsc,
    bankName
  ],(err,result)=>{

    if(err){
      console.log(err);
      return res.status(500).json({message:"Insert failed"});
    }

    res.json({message:"Employee added"});

  });

});


/* DELETE */

router.delete("/:id",(req,res)=>{

  db.query(
    "DELETE FROM employees WHERE id=?",
    [req.params.id],
    (err)=>{

      if(err){
        console.log(err);
        return res.status(500).json({message:"Delete failed"});
      }

      res.json({message:"Employee deleted"});

  });

});


module.exports = router;