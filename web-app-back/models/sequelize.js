const pool = require('../config/db');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'BNTU',"postgres", "12345678", {
        dialect: "postgres",
        host: "localhost",
        define: {
            timestamps: false
        }
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize);
db.roles = require('./role.model')(sequelize);
//db.students = require('./student.model')(sequelize);
db.groups = require('./group.model')(sequelize);
db.specialty = require('./specialty.model')(sequelize);
db.cathedra = require('./cathedra.model')(sequelize);
db.faculties = require('./faculty.model')(sequelize);
db.universities = require('./university.model')(sequelize);

// db.roles.hasMany(db.users, {
//     foreignKey: "role_id",
//     as: "users"});
// db.users.belongsTo(db.roles, {
//     foreignKey: "role_id",
//     as: "role",
// });
module.exports = db;
