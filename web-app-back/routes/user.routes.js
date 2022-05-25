const express = require("express");
const router = express.Router();
const verify = require('../verifyToken')
const pool = require("../config/db");
const userController = require("../controllers/user.controller.js");

// router.post("/create", userController.createUser);
// router.get("/all", userController.findAllUsers);
// router.get("/:id", userController.findUserById);

const ALL_USERS_SECRETARY = `SELECT * FROM users WHERE role_id = 3`;

router.get('/secretary', verify, async (req, res) => {
    try {
        const data = await pool.query(ALL_USERS_SECRETARY)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router
