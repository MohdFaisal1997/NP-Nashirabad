const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      user: result[0]
    });

  });

});

module.exports = router;