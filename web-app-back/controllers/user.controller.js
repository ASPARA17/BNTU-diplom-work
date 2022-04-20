const db = require("../models/sequelize");
const User = db.users;
const Role = db.roles;
const { Op } = require('@sequelize/core');
const {Sequelize} = require("@sequelize/core");


exports.createUser = (req, res) => {
    const user = {
        user_login: req.body.user_login,
        user_password: req.body.user_password,
        user_first_name: req.body.user_first_name,
        user_second_name: req.body.user_second_name,
        user_middle_name: req.body.user_middle_name,
        user_confirm: req.body.user_confirm,
        role_id: req.body.role_id
    };
    return User.create(user)
        .then(user => {
            res.send(user);
            return user;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findUserById = (req, res) => {
    const id = req.params.id;
    return User.findByPk(id)
        .then(user => {
            if (user) {
                res.send(user);
                return user;
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// all users without admin
exports.findAllUsers = (req, res) => {
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    return User.findAll({
        include: {
            model: Role,
            as: 'role',
            where: {
                role_name: {
                    [Op.ne]: 'admin'
                }
            }
        }
    }).then(data => {
        res.send(data);
    });
    //     console.log(JSON.stringify(users, null, 4));
    //     return users;
    // });
};





