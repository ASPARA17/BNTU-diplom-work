const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");
const groupController = require("../controllers/group.controller.js");

// router.post("/create", groupController.create);
// //router.get("/all", groupController.findAll);
// router.get("/all/:cathedra_id", groupController.findAllByCathedraId);
// router.get("/:id", groupController.findById);
// router.delete("/:id", groupController.delete);
// router.put("/:id", groupController.update);


const ALL_GROUPS = `SELECT g.group_id, g.group_name, g.fk_specialty, s.specialty_id , s.specialty_name FROM groups g 
                    JOIN specialty s ON s.specialty_id = g.fk_specialty`;
const UPDATE_GROUP = `UPDATE groups SET group_name = $1, fk_specialty=$2 WHERE group_id =$3`;
const ADD_GROUP = `INSERT INTO groups(group_name, fk_specialty) VALUES ($1,$2)`;


router.get('/all', async (req, res) => {
    //console.log("hi index")
    try {
        const data = await pool.query(ALL_GROUPS);
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
});

//TODO: ADD verify
router.put('/update', async(req,res) => {
    try {
        const group = req.body;
        await pool.query(UPDATE_GROUP, [group.group_name, group.fk_specialty, group.group_id]);
        res.json('group was update')
    } catch (error) {
        console.log(error.message)
    }
})

//TODO: ADD verify
router.post('/create', async (req, res) => {
    try {
        const group = req.body;
        await pool.query(ADD_GROUP, [group.group_name, group.fk_specialty])
        res.json('date was posted')
    } catch (error) {
      console.log(error.message)
    }
});

//
// const ADD_GROUP = `INSERT INTO groups(group_name, fk_specialty) VALUES ($1,$2)`
// const GROUPS_AND_SPECIALTY_BY_CATHEDRA = `SELECT group_id, group_name, specialty_name FROM groups JOIN specialty
//   ON groups.fk_specialty = specialty.specialty_id WHERE fk_cathedra = $1`
// const DELETE_GROUP = `DELETE FROM groups WHERE group_id = $1`

//
// router.post('/add_group',verify, async (req, res) => {
//     try {
//       const {groupName, specialtyId} = req.body;
//       await pool.query(ADD_GROUP, [groupName, specialtyId])
//       res.json('date was posted')
//     } catch (error) {
//       console.log(error.message)
//     }
// });
//
// router.get('/:cathedraId', async (req, res) => {
//   try {
//     const {cathedraId} = req.params;
//     const data = await pool.query(GROUPS_AND_SPECIALTY_BY_CATHEDRA, [cathedraId]);
//     res.json(data.rows)
//   } catch (error) {
//     console.log(error.message)
//   }
// });
//
// router.delete('/:groupId', verify, async(req, res) => {
//     try {
//         const {groupId}  = req.params;
//         await pool.query(DELETE_GROUP, [groupId]);
//     } catch (error) {
//         console.log(error.message)
//     }
// });
//


module.exports = router
