const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* GET BANKS */

router.get("/",(req,res)=>{

  db.query(
    "SELECT * FROM banks ORDER BY id DESC",
    (err,result)=>{

      if(err){
        console.log(err);
        return res.status(500).json({message:"Database error"});
      }

      res.json(result);

  });

});


/* ADD BANK */

router.post("/",(req,res)=>{

  const {
    bank_name,
    account_name,
    account_number,
    ifsc_code,
    branch
  } = req.body;

  const sql = `
  INSERT INTO banks
  (bank_name,account_name,account_number,ifsc_code,branch)
  VALUES (?,?,?,?,?)
  `;

  db.query(sql,[
    bank_name,
    account_name,
    account_number,
    ifsc_code,
    branch
  ],(err,result)=>{

    if(err){
      console.log(err);
      return res.status(500).json({message:"Insert failed"});
    }

    res.json({message:"Bank added"});

  });

});


/* UPDATE BANK */

router.put("/:id",(req,res)=>{

  const id = req.params.id;

  const {
    bank_name,
    account_name,
    account_number,
    ifsc_code,
    branch
  } = req.body;

  const sql = `
  UPDATE banks SET
  bank_name=?,
  account_name=?,
  account_number=?,
  ifsc_code=?,
  branch=?
  WHERE id=?
  `;

  db.query(sql,[
    bank_name,
    account_name,
    account_number,
    ifsc_code,
    branch,
    id
  ],(err,result)=>{

    if(err){
      console.log(err);
      return res.status(500).json({message:"Update failed"});
    }

    res.json({message:"Bank updated"});

  });

});


/* DELETE BANK */

router.delete("/:id",(req,res)=>{

  db.query(
    "DELETE FROM banks WHERE id=?",
    [req.params.id],
    (err)=>{

      if(err){
        console.log(err);
        return res.status(500).json({message:"Delete failed"});
      }

      res.json({message:"Bank deleted"});

  });

});


module.exports = router;