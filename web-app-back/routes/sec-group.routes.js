const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_SEC_GROUP_BY_SEC_ID = `SELECT * FROM sec_group sg JOIN sec ON sec.sec_id = sg.sec_id JOIN groups g ON 
    g.group_id = sg.group_id JOIN specialty spec ON spec.specialty_id = g.fk_specialty WHERE sec.sec_id = $1`

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

module.exports = router
