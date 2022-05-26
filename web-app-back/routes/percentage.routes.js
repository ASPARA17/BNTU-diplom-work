const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const CREATE_PERCENTAGE = `INSERT INTO percentage(comment, name, start_date, end_date, sec_id, plan_percent)
    VALUES($1, $2, $3, $4, $5, $6)`;

router.get('/:id', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const data = await pool.query(ALL_SEC_GROUP_BY_SEC_ID, [id]);
        res.json(data.rows)
        console.log(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const percentage = req.body;
        await pool.query(CREATE_PERCENTAGE, [percentage.comment, percentage.name, percentage.start_date,
            percentage.end_date, percentage.sec_id, percentage.plan_percent])
        res.json('date was posted')
    } catch (error) {
        console.log(error.message)
    }
});


module.exports = router
