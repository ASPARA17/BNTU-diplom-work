const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");

const ALL_FACULTIES = `SELECT * FROM faculty f JOIN university u ON f.fk_university = u.university_id`;
const ALL_FACULTIES_BY_UNIVERSITY_ID = `SELECT * FROM faculty f JOIN university u ON f.fk_university = u.university_id 
    WHERE f.fk_university = $1`;
const ADD_FACULTY = `INSERT INTO faculty(faculty_name, faculty_name_full, fk_university) VALUES($1, $2, $3)`;
const UPDATE_FACULTY = `UPDATE faculty SET faculty_name = $1, faculty_name_full = $2, fk_university = $3 WHERE faculty_id = $4`;
const DELETE_FACULTY = `DELETE FROM faculty WHERE faculty_id = $1`;

router.get('/', verify, async (req, res) => {
    try {
        const data = await pool.query(ALL_FACULTIES);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const id = req.params;
        const data = await pool.query(ALL_FACULTIES_BY_UNIVERSITY_ID, [id]);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const faculty = req.body;
        await pool.query(ADD_FACULTY, [faculty.faculty_name, faculty.faculty_name_full, faculty.fk_university])
        res.json('date was posted')
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/', verify, async(req,res) => {
    try {
        const faculty = req.body;
        await pool.query(UPDATE_FACULTY, [faculty.faculty_name, faculty.faculty_name_full, faculty.fk_university,
            faculty.faculty_id]);
        res.json('faculty was update')
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/:id', verify, async(req, res) => {
    try {
        const id = req.params;
        await pool.query(DELETE_FACULTY, [id]);
        res.json('faculty was deleted')
    } catch (error) {
        console.log(error.message)
    }
});


module.exports = router