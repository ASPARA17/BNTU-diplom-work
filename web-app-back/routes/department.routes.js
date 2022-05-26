const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");

const ALL_DEPARTMENTS = `SELECT * FROM cathedra c JOIN faculty f ON c.fk_faculty = f.faculty_id`;
const ALL_DEPARTMENTS_BY_FACULTY_ID = `SELECT * FROM cathedra c JOIN faculty f ON c.fk_faculty = f.faculty_id WHERE fk_faculty = $1`;
const ADD_DEPARTMENT = `INSERT INTO cathedra(cathedra_name, fk_faculty, cathedra_name_full) VALUES($1,$2,$3)`;
const UPDATE_DEPARTMENT = `UPDATE cathedra SET cathedra_name = $1, fk_faculty = $2, cathedra_name_full = $3 WHERE cathedra_id = $4`;
const DELETE_DEPARTMENT = `DELETE FROM cathedra WHERE cathedra_id = $1`;
const ALL_BY_SEC_ID = `SELECT * FROM cathedra c LEFT JOIN faculty f ON f.faculty_id = c.fk_faculty LEFT JOIN sec s 
    ON s.fk_cathedra = c.cathedra_id WHERE s.sec_id = $1`;

router.get('/', verify, async (req, res) => {
    try {
        const data = await pool.query(ALL_DEPARTMENTS);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const id = req.params;
        const data = await pool.query(ALL_DEPARTMENTS_BY_FACULTY_ID, [id]);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const department = req.body;
        await pool.query(ADD_DEPARTMENT, [department.cathedra_name, department.fk_faculty, department.cathedra_name_full])
        res.json('date was posted')
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/', verify, async(req,res) => {
    try {
        const department = req.body;
        await pool.query(UPDATE_DEPARTMENT, [department.cathedra_name, department.fk_faculty, department.cathedra_name_full,
            department.cathedra_id]);
        res.json('department was update')
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/:id', verify, async(req, res) => {
    try {
        const id = req.params;
        await pool.query(DELETE_DEPARTMENT, [id]);
        res.json('department was deleted')
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/sec/:id', async (req, res) => {
    try {
        const id = req.params.id
        const sec = await pool.query(ALL_BY_SEC_ID ,[id])
        res.json(sec.rows)
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router
