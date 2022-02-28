const express = require("express");
const router = express.Router(); // express.Router()
const verify = require('../verifyToken')
const pool = require("../db");

const ADD_GROUP = `INSERT INTO groups(group_name, fk_specialty) VALUES ($1,$2)`
const GROUPS_AND_SPECIALTY_BY_CATHEDRA = `SELECT group_id, group_name, specialty_name FROM groups JOIN specialty 
  ON groups.fk_specialty = specialty.specialty_id WHERE fk_cathedra = $1`
const DELETE_GROUP = `DELETE FROM groups WHERE group_id = $1`

router.post('/add_group',verify, async (req, res) => {
    try {
      const {groupName, specialtyId} = req.body;
      await pool.query(ADD_GROUP, [groupName, specialtyId])
      res.json('date was posted')
    } catch (error) {
      console.log(error.message)
    }
});

router.get('/:cathedraId', async (req, res) => {
  try {
    const {cathedraId} = req.params;
    const data = await pool.query(GROUPS_AND_SPECIALTY_BY_CATHEDRA, [cathedraId]);
    res.json(data.rows)
  } catch (error) {
    console.log(error.message)
  }
});

router.delete('/:groupId', verify, async(req, res) => {
    try {
        const {groupId}  = req.params;
        await pool.query(DELETE_GROUP, [groupId]);
        res.json('university was deleted')
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router
