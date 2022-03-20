const db = require("../models/sequelize");
const Student = db.students;

exports.create = (req, res) => {
    // Validate request
    const student = {
        user_id: req.body.user_id,
        group_id: req.body.group_id
    };
    // Save in the database
    return Student.create(student)
        .then(data => {
            res.send(data);
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        });
};

exports.findAll = (req, res) => {
    return Student.findAll({ include: ["user", "group"]})
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};

