const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");


const SEC_USER_BY_ID = `SELECT * FROM sec_user su JOIN sec_role sr ON su.id_sec_role = sr.id_sec_role  LEFT JOIN users u ON 
    su.id_user = u.user_id WHERE su.id_sec_user = $1`;
const ALL_SEC_USERS = `SELECT * FROM sec_user su LEFT JOIN sec_role sr ON su.id_sec_role = sr.id_sec_role LEFT JOIN 
    users u ON su.id_user = u.user_id`;
const ALL_SEC_USERS_BY_SEC_ID = `SELECT * FROM sec_user su LEFT JOIN sec_role sr ON su.id_sec_role = sr.id_sec_role 
    LEFT JOIN users u ON su.id_user = u.user_id WHERE su.id_sec = $1`;
const DELETE_SEC_USER = `DELETE FROM sec_user WHERE id_sec_user = $1`;
const CREATE_SEC_USER = `INSERT INTO sec_user(firstname, lastname, middlename, id_user, id_sec_role, id_sec) 
    VALUES($1,$2,$3,$4,$5,$6)`;
const UPDATE_SEC_USER = `UPDATE sec_user SET firstname = $1, lastname = $2, middlename = $3, id_user = $4, 
    id_sec_role = $5, id_sec = $6 WHERE id_sec_user = $7`


router.get('/:id', verify, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query(SEC_USER_BY_ID,[id])
    res.json(data.rows)
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/', verify, async (req, res) => {
  try {
    const data = await pool.query(ALL_SEC_USERS)
    res.json(data.rows)
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/sec/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query(ALL_SEC_USERS_BY_SEC_ID,[id])
    res.json(data.rows)
  } catch (error) {
    console.log(error.message)
  }
})

router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    await pool.query(DELETE_SEC_USER, [id])
    res.json({message: 'sec user was deleted'})
  } catch (error) {
    console.log(error.message)
  }
});

router.post('/', verify, async (req, res) => {
  try {
    const secUser = req.body;
    await pool.query(CREATE_SEC_USER, [secUser.firstname, secUser.lastname, secUser.middlename, secUser.id_user,
                                      secUser.id_sec_role, secUser.id_sec])
    res.json('date was posted')
  } catch (error) {
    console.log(error.message)
  }
});

router.put('/', async(req,res) => {
  try {
    const secUser = req.body;
    await pool.query(UPDATE_SEC_USER,[secUser.firstname, secUser.lastname, secUser.middlename, secUser.id_user,
              secUser.id_sec_role, secUser.id_sec, secUser.id_sec_user]);
    res.json('sec user was update')
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router



