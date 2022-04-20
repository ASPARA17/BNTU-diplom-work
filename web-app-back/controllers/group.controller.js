const db = require("../models/sequelize");
const Group = db.groups;
const Specialty = db.specialty;
const { Op } = require('@sequelize/core');

exports.create = (req, res) => {
    // Validate request
    const group = {
        group_name: req.body.group_name,
        fk_specialty: req.body.fk_specialty
    };
    return Group.create(group)
        .then(data => {
            res.send(data);
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Group."
            });
        });
};

exports.findAll = (req, res) => {
    return Group.findAll({
        include: ["specialty"]
    })
        .then(data => {
            res.send(data);
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving groups."
            });
        });
};

exports.findAllByCathedraId = (req, res) => {
    const cathedraId = req.params.cathedra_id;
    return Group.findAll({
        include: {
            model: Specialty,
            as: 'specialty',
            where: {
                fk_cathedra: {
                    [Op.eq]: cathedraId
                }
            }
        }
    })
        .then(data => {
            res.send(data);
            return data;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving groups."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    return Group.findByPk(id, {
        include: ["specialty"]
    })
        .then(data => {
            if (data) {
                res.send(data);
                return data;
            } else {
                res.status(404).send({
                    message: `Cannot find Group with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Group with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Group.destroy({
        where: { group_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Group was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Group with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Group.update(req.body, {
        where: { group_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Group was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Group with id=" + id
            });
        });
};

