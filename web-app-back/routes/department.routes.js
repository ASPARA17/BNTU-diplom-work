const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");

const ALL_DEPARTMENTS = `SELECT * FROM cathedra`;

router.get('/', async (req, res) => {
    try {
        const data = await pool.query(ALL_DEPARTMENTS);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});


module.exports = router