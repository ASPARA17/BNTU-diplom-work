const db = require("../models/sequelize");
const University = db.universities;
const { Op } = require('@sequelize/core');


exports.findAll = (req, res) => {
    return University.findAll()
        .then(data => {
            res.send(data);
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving universities."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    return University.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
                return data;
            } else {
                res.status(404).send({
                    message: `Cannot find University with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving University with id=" + id
            });
        });
};


