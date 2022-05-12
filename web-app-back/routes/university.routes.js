const express = require("express");
const router = express.Router();
const verify = require("../verifyToken");
const pool = require("../config/db");

// router.get("/all", universityController.findAll);
// router.get("/:id", universityController.findById);

const ALL_UNIVERSITIES = `SELECT * FROM university`;
const ADD_UNIVERSITY = `INSERT INTO university(university_name, university_name_full) VALUES($1, $2)`;
const UPDATE_UNIVERSITY = `UPDATE university SET university_name = $1, university_name_full = $2 WHERE university_id = $3`;
const DELETE_UNIVERSITY = `DELETE FROM university WHERE university_id = $1`;

router.get('/', verify, async (req, res) => {
    try {
        const data = await pool.query(ALL_UNIVERSITIES);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const university = req.body;
        await pool.query(ADD_UNIVERSITY, [university.university_name, university.university_name_full])
        res.json('date was posted')
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/', verify, async(req,res) => {
    try {
        const university = req.body;
        await pool.query(UPDATE_UNIVERSITY, [university.university_name, university.university_name_full, university.university_id]);
        res.json('university was update')
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/:id', verify, async(req, res) => {
    try {
        const id = req.params;
        await pool.query(DELETE_UNIVERSITY, [id]);
        res.json('university was deleted')
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router