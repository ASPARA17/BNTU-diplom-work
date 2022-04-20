const db = require("../models/sequelize");
const Specialty = db.specialty;
const { Op } = require('@sequelize/core');

exports.findAll = (req, res) => {
    return Specialty.findAll({
    })
        .then(data => {
            res.send(data);
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving specialties."
            });
        });
}