const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_YEARS = `SELECT * FROM years_of_study`;


router.get('/', verify, async (req, res) => {
    try {
        const sec = await pool.query(ALL_YEARS)
        res.json(sec.rows)
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router
