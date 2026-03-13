const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* GET ALL TRANSACTIONS */

router.get("/", (req,res)=>{

const sql = `
SELECT 
t.*,
b.bank_name,
b.account_number
FROM transactions t
LEFT JOIN banks b ON b.id = t.bank_id
ORDER BY t.id DESC
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Server error"});
}

res.json(result);

});

});



/* ADD TRANSACTION */

router.post("/",(req,res)=>{

const {
bank_from,
bank_id,
date,
amount,
account_type,
particular,
remark
} = req.body;


const sql = `
INSERT INTO transactions
(bank_from,bank_id,date,amount,account_type,particular,remark)
VALUES (?,?,?,?,?,?,?)
`;

db.query(sql,[
bank_from,
bank_id,
date,
amount,
account_type,
particular,
remark
],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Insert failed"});
}

res.json({message:"Payment Deposited Successfully"});

});

});



/* DELETE */

router.delete("/:id",(req,res)=>{

const sql = "DELETE FROM transactions WHERE id=?";

db.query(sql,[req.params.id],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Delete failed"});
}

res.json({message:"Deleted"});

});

});

module.exports = router;