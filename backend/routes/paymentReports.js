const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* GET REPORT */

router.get("/", (req,res)=>{

const {bank_id, contractor_id, type, from, to} = req.query;

let sql = `
SELECT 

pr.id AS TransactionID,

b.bank_name AS Bank,

c.name AS Contractor,

pr.payment_type AS TransactionType,

CASE 
WHEN pr.account_type='Credit' THEN pr.amount
ELSE 0
END AS CreditPayment,

CASE 
WHEN pr.account_type='Debit' THEN pr.amount
ELSE 0
END AS DebitPayment,

pr.date AS TransactionDate,

pr.particular

FROM payment_reports pr

LEFT JOIN banks b ON b.id = pr.bank_id
LEFT JOIN contractors c ON c.id = pr.contractor_id
WHERE 1=1
`;

let params=[];

if(bank_id){
sql+=" AND pr.bank_id=?";
params.push(bank_id);
}

if(contractor_id){
sql+=" AND pr.contractor_id=?";
params.push(contractor_id);
}

if(type){
sql+=" AND pr.account_type=?";
params.push(type);
}

if(from && to){
sql+=" AND pr.date BETWEEN ? AND ?";
params.push(from,to);
}

sql+=" ORDER BY pr.id DESC";

db.query(sql,params,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Server error"});
}

res.json(result);

});

});


/* DELETE */

router.delete("/:id",(req,res)=>{

db.query(
"DELETE FROM payment_reports WHERE id=?",
[req.params.id],
(err,result)=>{

if(err) return res.status(500).json(err);

res.json({message:"Deleted"});

});

});


module.exports = router;