// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// router.get("/", (req,res)=>{

// const { bank_id, from, to } = req.query;

// let sql = `
// SELECT
// t.id,
// b.bank_name,
// '-' AS contractor_name,
// 'Bank Transfer' AS payment_type,
// 'Credit' AS account_type,
// t.amount,
// t.date
// FROM transactions t
// LEFT JOIN banks b ON b.id = t.bank_id

// UNION ALL

// SELECT
// p.id,
// b.bank_name,
// '-' AS contractor_name,
// p.payment_type,
// 'Debit' AS account_type,
// p.amount,
// p.date
// FROM payments p
// LEFT JOIN banks b ON b.id = p.bank_id

// ORDER BY date ASC
// `;

// db.query(sql,(err,result)=>{

// if(err){
// console.log(err);
// return res.status(500).json(err);
// }

// res.json(result);

// });

// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req,res)=>{

const { bank_id, from, to } = req.query;

let sql = `
SELECT
t.id,
b.bank_name,
'Bank Transfer' AS payment_type,
'Credit' AS account_type,
t.amount,
t.date
FROM transactions t
LEFT JOIN banks b ON b.id = t.bank_id
WHERE 1=1
`;

let params = [];

/* BANK FILTER */
if(bank_id && bank_id !== "all"){
sql += " AND t.bank_id=?";
params.push(bank_id);
}

/* DATE FILTER */
if(from){
sql += " AND DATE(t.date)>=?";
params.push(from);
}

if(to){
sql += " AND DATE(t.date)<=?";
params.push(to);
}

/* SECOND TABLE */

sql += `

UNION ALL

SELECT
p.id,
b.bank_name,
p.payment_type,
'Debit' AS account_type,
p.amount,
p.date
FROM payments p
LEFT JOIN banks b ON b.id = p.bank_id
WHERE 1=1
`;

if(bank_id && bank_id !== "all"){
sql += " AND p.bank_id=?";
params.push(bank_id);
}

if(from){
sql += " AND DATE(p.date)>=?";
params.push(from);
}

if(to){
sql += " AND DATE(p.date)<=?";
params.push(to);
}

sql += " ORDER BY date ASC";

db.query(sql,params,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json(err);
}

res.json(result);

});

});

module.exports = router;