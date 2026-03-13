const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* GET Contractors */

router.get("/", (req,res)=>{

  db.query("SELECT * FROM contractors ORDER BY id DESC",(err,result)=>{

    if(err){
      console.log(err);
      return res.status(500).json({message:"Database error"});
    }

    res.json(result);

  });

});


/* ADD Contractor */

router.post("/",(req,res)=>{

  const {
    name,
    contact,
    address,
    pan_number,
    gst,
    bank_name,
    bank_account,
    ifsc
  } = req.body;

  const sql = `
    INSERT INTO contractors
    (name,contact,address,pan_number,gst,bank_name,bank_account,ifsc)
    VALUES (?,?,?,?,?,?,?,?)
  `;

  db.query(sql,[
    name,
    contact,
    address,
    pan_number,
    gst,
    bank_name,
    bank_account,
    ifsc
  ],(err,result)=>{

    if(err){
      console.log(err);
      return res.status(500).json({message:"Insert failed"});
    }

    res.json({message:"Contractor added"});

  });

});


/* UPDATE Contractor */

router.put("/:id",(req,res)=>{

  const id = req.params.id;

  const {
    name,
    contact,
    address,
    pan_number,
    gst,
    bank_name,
    bank_account,
    ifsc
  } = req.body;

  const sql = `
    UPDATE contractors SET
    name=?,
    contact=?,
    address=?,
    pan_number=?,
    gst=?,
    bank_name=?,
    bank_account=?,
    ifsc=?
    WHERE id=?
  `;

  db.query(sql,[
    name,
    contact,
    address,
    pan_number,
    gst,
    bank_name,
    bank_account,
    ifsc,
    id
  ],(err,result)=>{

    if(err){
      console.log(err);
      return res.status(500).json({message:"Update failed"});
    }

    res.json({message:"Contractor updated"});

  });

});


/* DELETE Contractor */

router.delete("/:id",(req,res)=>{

  const id = req.params.id;

  db.query(
    "DELETE FROM contractors WHERE id=?",
    [id],
    (err,result)=>{

      if(err){
        console.log(err);
        return res.status(500).json({message:"Delete failed"});
      }

      res.json({message:"Contractor deleted"});

  });

});


module.exports = router;