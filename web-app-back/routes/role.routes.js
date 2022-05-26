const express = require("express");
const router = express.Router(); // express.Router()
const verify = require('../verifyToken')
const pool = require("../config/db");

const roles = require("../controllers/role.controller.js");

router.post("/", roles.create);

router.get("/", roles.findAll);

router.get("/:id", roles.findOne);



module.exports = router


//     // Retrieve all Tutorials
//     router.get("/", roles.findAll);
//     // Retrieve all published Tutorials
//     router.get("/published", roles.findAllPublished);
//     // Retrieve a single Tutorial with id
//     router.get("/:id", roles.findOne);
//     // Update a Tutorial with id
//     router.put("/:id", roles.update);
//     // Delete a Tutorial with id
//     router.delete("/:id", roles.delete);
//     // Delete all Tutorials
//     router.delete("/", roles.deleteAll);
//     routerRole.use('/api/roles', router);
// };