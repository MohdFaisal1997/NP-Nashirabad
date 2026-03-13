const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* GET PAYMENTS */

router.get("/", (req,res)=>{

const sql = `
SELECT p.*, b.bank_name
FROM payments p
LEFT JOIN banks b ON b.id = p.bank_id
ORDER BY p.id DESC
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Server error"});
}

res.json(result);

});

});



/* ADD PAYMENT */

router.post("/", (req,res)=>{

const {
bank_id,
payment_type,
date,
amount,
account_type,
particular,
remark
} = req.body;


const sql = `
INSERT INTO payments
(bank_id,payment_type,date,amount,account_type,particular,remark)
VALUES (?,?,?,?,?,?,?)
`;

db.query(sql,
[
bank_id,
payment_type,
date,
amount,
account_type,
particular,
remark
],
(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Insert failed"});
}

res.json({message:"Payment saved"});

});

});



/* DELETE PAYMENT */

router.delete("/:id",(req,res)=>{

const sql = "DELETE FROM payments WHERE id=?";

db.query(sql,[req.params.id],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Delete failed"});
}

res.json({message:"Deleted successfully"});

});

});


module.exports = router;