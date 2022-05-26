const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_SEC_SPECIALTY_BY_SEC_ID = `SELECT * FROM sec_specialty ss JOIN sec ON sec.sec_id = ss.sec_id JOIN specialty 
    spec ON spec.specialty_id = ss.specialty_id WHERE sec.sec_id = $1 AND spec.fk_cathedra = sec.fk_cathedra`
const DELETE_SEC_SPECIALTY = `DELETE FROM sec_specialty WHERE sec_id = $1 AND specialty_id = $2`

router.get('/:id', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const data = await pool.query(ALL_SEC_SPECIALTY_BY_SEC_ID, [id]);
        res.json(data.rows)
        console.log(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.delete('/:id&:sec_id', verify, async(req, res) => {
    try {
        const {id, secId} = req.params;
        await pool.query(DELETE_SEC_SPECIALTY, [secId, id]);
        res.json('sec specialty was deleted')
    } catch (error) {
        console.log(error.message)
    }
});



module.exports = router
