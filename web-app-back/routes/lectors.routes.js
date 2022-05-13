const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_LECTORS = `SELECT lector_id, vacancy, busy_place, position, user_second_name, user_first_name, user_middle_name, 
    user_second_name ||' '|| LEFT(user_first_name,1) || '.'|| LEFT(user_middle_name,1) || '.' initials_lector
  FROM lectors JOIN users ON users.user_id = lectors.user_id`

const UPDATE_PLACE_IN_LECTOR = `UPDATE lectors SET vacancy = $1, busy_place = $2 WHERE lector_id = $3`;

router.get('/', verify, async (req, res) => {
    try {
        const lectors = await pool.query(ALL_LECTORS);
        res.json(lectors.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.put('/place', verify, async(req,res) => {
    try {
        const lector = req.body;
        await pool.query(UPDATE_PLACE_IN_LECTOR, [lector.vacancy, lector.busy_place, lector.lector_id]);
        res.json('place was update')
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router
