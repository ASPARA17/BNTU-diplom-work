const express = require("express");
const router = express.Router(); // express.Router()
const verify = require('../verifyToken')
const pool = require("../config/db");
const userController = require("../controllers/user.controller.js");

router.post("/create", userController.createUser);
router.get("/all", userController.findAllUsers);
router.get("/:id", userController.findUserById);


module.exports = router