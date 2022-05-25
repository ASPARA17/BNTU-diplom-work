const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_LECTORS = `SELECT lector_id, vacancy, busy_place, position, lectors.user_id, user_second_name, user_first_name, user_middle_name, 
    user_second_name ||' '|| LEFT(user_first_name,1) || '.'|| LEFT(user_middle_name,1) || '.' initials_lector
  FROM lectors JOIN users ON users.user_id = lectors.user_id`

const UPDATE_PLACE_IN_LECTOR = `UPDATE lectors SET vacancy = $1, busy_place = $2 WHERE lector_id = $3`;
const LIST_STUDENTS_AND_TOPIC = `SELECT dw.name, l.lector_id, s.student_id, g.group_name,u.user_first_name, 
    u.user_second_name, u.user_middle_name, u.user_second_name ||' '|| LEFT(u.user_first_name,1) || '.'|| 
    LEFT(u.user_middle_name,1) || '.' initials_student FROM diplom_work dw JOIN lectors l ON dw.id_leader = l.lector_id
    LEFT JOIN students s ON dw.id_student = s.student_id LEFT JOIN users U ON s.user_id = u.user_id LEFT JOIN groups g 
    ON s.group_id = g.group_id WHERE dw.id_leader = $1`;

router.get('/', verify, async (req, res) => {
    try {
        const lectors = await pool.query(ALL_LECTORS);
        res.json(lectors.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.put('/place', verify, async(req,res) => {
    try {
        const lector = req.body;
        await pool.query(UPDATE_PLACE_IN_LECTOR, [lector.vacancy, lector.busy_place, lector.lector_id]);
        res.json('place was update')
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/list_student/:id', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const data = await pool.query(LIST_STUDENTS_AND_TOPIC, [id]);
        res.json(data.rows)
        console.log(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});



module.exports = router
