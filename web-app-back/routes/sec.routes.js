const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_SEC = `SELECT * FROM sec`;
const DELETE_SEC = `DELETE FROM sec WHERE sec_id = $1`;
const CREATE_SEC = `INSERT INTO sec (sec_number, sec_start_date, sec_end_date, year_id) VALUES($1, $2, $3, $4)`;
const SEC_BY_ID = `SELECT * FROM sec JOIN years_of_study y ON sec.year_id = y.year_id WHERE sec_id = $1`;
const ALL_SEC_BY_USER_ID = `SELECT * FROM sec JOIN sec_user su ON su.id_sec = sec.sec_id WHERE su.id_user = $1`;
const UPDATE_CATHEDRA = `UPDATE sec SET fk_cathedra = $1 WHERE sec_id = $2`;

router.get('/', verify, async (req, res) => {
    try {
        const sec = await pool.query(ALL_SEC)
        res.json(sec.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// router.delete('/:id', verify, async(req, res) => {
//     try {
//         const {id} = req.params;
//         await pool.query(DELETE_SEC, [id], (err, results) => {
//             if (!err) {
//                 return res.json({message: "Успешно удалено"})
//             } else {
//                 return res.json(err)
//             }
//         })
//         res.json('sec was deleted')
//     } catch (error) {
//         console.log(error.message)
//     }
// });

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await pool.query(DELETE_SEC, [id])
        res.json({message: 'sec was deleted'})
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const sec = req.body;
        await pool.query(CREATE_SEC, [sec.sec_number, sec.sec_start_date, sec.sec_end_date, sec.year_id])
        res.json('date was posted')
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const id = req.params.id
        const sec = await pool.query(SEC_BY_ID ,[id])
        res.json(sec.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/by_user/:id', verify, async (req, res) => {
    try {
        const id = req.params.id
        const sec = await pool.query(ALL_SEC_BY_USER_ID ,[id])
        res.json(sec.rows)
        console.log(sec)
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/', verify, async (req, res) => {
    try {
        const {cathedraId,secId} = req.body;
        const sec = await pool.query(UPDATE_CATHEDRA, [cathedraId,secId])
        res.json(sec.rows)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router
