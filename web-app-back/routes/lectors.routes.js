const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_LECTORS = `SELECT vacancy, busy_place, position, user_second_name, user_first_name, user_middle_name, 
    user_second_name ||' '|| LEFT(user_first_name,1) || '.'|| LEFT(user_middle_name,1) || '.' initials_lector
  FROM lectors JOIN users ON users.user_id = lectors.user_id`

router.get('/', verify, async (req, res) => {
    try {
        const lectors = await pool.query(ALL_LECTORS);
        res.json(lectors.rows)
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router
