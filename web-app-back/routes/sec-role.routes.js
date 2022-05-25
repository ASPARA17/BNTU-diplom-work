const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_SEC_ROLE = `SELECT * FROM sec_role`;

router.get('/', verify, async (req, res) => {
    try {
        const data = await pool.query(ALL_SEC_ROLE)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router



