const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const ALL_STUDENTS_BY_GROUP_AND_SEC_ID = `SELECT u.user_second_name ||' '|| LEFT(u.user_first_name,1) || '.'|| 
    LEFT(u.user_middle_name,1) || '.' initials_student, u.user_second_name, u.user_first_name, u.user_middle_name, 
    g.group_name, spec.specialty_name,dw.name topic, dw.id_leader, dw.mark FROM students s JOIN users u ON u.user_id = s.user_id
    JOIN groups g ON g.group_id = s.group_id JOIN specialty spec ON spec.specialty_id = g.fk_specialty JOIN sec_specialty ss 
    ON spec.specialty_id = ss.specialty_id JOIN diplom_work dw ON dw.id_student = s.student_id JOIN sec ON sec.sec_id = ss.sec_id
    WHERE sec.sec_id = $1 AND g.group_name = $2`

const ALL_STUDENTS_BY_SEC_ID = `SELECT u.user_second_name ||' '|| LEFT(u.user_first_name,1) || '.'|| 
    LEFT(u.user_middle_name,1) || '.' initials_student, u.user_second_name, u.user_first_name, u.user_middle_name, 
    g.group_name, spec.specialty_name,dw.name topic, dw.id_leader, dw.mark FROM students s JOIN users u ON u.user_id = s.user_id
    JOIN groups g ON g.group_id = s.group_id JOIN specialty spec ON spec.specialty_id = g.fk_specialty JOIN sec_specialty ss 
    ON spec.specialty_id = ss.specialty_id JOIN diplom_work dw ON dw.id_student = s.student_id JOIN sec ON sec.sec_id = ss.sec_id
    WHERE sec.sec_id = $1 `

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = await pool.query(ALL_STUDENTS_BY_SEC_ID, [id]);
        res.json(data.rows)
        console.log(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});



module.exports = router
