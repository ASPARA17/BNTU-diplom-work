const express = require("express");
const router = express.Router();
const universityController = require("../controllers/university.controller.js");

router.get("/all", universityController.findAll);
router.get("/:id", universityController.findById);

module.exports = router