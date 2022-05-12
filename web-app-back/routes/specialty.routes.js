const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");



const ALL_SPECIALTY = `SELECT * FROM specialty`;
const SPECIALTIES_BY_CATHEDRA_ID =`SELECT * FROM specialty WHERE fk_cathedra = $1`;
//const SPECIALTIES_BY_CATHEDRA_ID = `SELECT specialty_id, specialty_name_full, specialty_name, specialty_number FROM specialty WHERE fk_cathedra = $1`;
const ADD_SPECIALTY = `INSERT INTO specialty(fk_cathedra, specialty_name, specialty_name_full, specialty_number) VALUES($1,$2,$3,$4)`
const UPDATE_SPECIALTY = `UPDATE specialty SET fk_cathedra = $1, specialty_name = $2, specialty_name_full = $3, specialty_number = $4 WHERE specialty_id = $5`
const DELETE_SPECIALTY = `DELETE FROM specialty WHERE specialty_id = $1`;

router.get('/all', async (req, res) => {
    try {
        const data = await pool.query(ALL_SPECIALTY);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/all/:cathedraId', verify,async (req, res) => {
    try {
        const  {cathedraId} = req.params;
        const specialty = await pool.query(SPECIALTIES_BY_CATHEDRA_ID, [cathedraId])
        res.json(specialty.rows)
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/', verify, async (req, res) => {
    try {
        const specialty = req.body;
        await pool.query(ADD_SPECIALTY, [specialty.fk_cathedra, specialty.specialty_name,
                specialty.specialty_name_full, specialty.specialty_number])
        res.json('date was posted')
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/', async(req,res) => {
    try {
        const specialty = req.body;
        await pool.query(UPDATE_SPECIALTY, [specialty.fk_cathedra, specialty.specialty_name,
                    specialty.specialty_name_full, specialty.specialty_number, specialty.specialty_id]);
        res.json('specialty was update')
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/:id', verify, async(req, res) => {
    try {
        const id = req.params;
        await pool.query(DELETE_SPECIALTY, [id]);
        res.json('specialty was deleted')
    } catch (error) {
        console.log(error.message)
    }
});


module.exports = router
