// const {DataTypes} = require("sequelize");
// module.exports = (sequelize) => {
//     const User = require('./user.model')(sequelize);
//     const Group = require('./group.model')(sequelize);
//     const Student = sequelize.define("students", {
//         student_id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: User,
//                 key: 'user_id',
//             }
//         },
//         group_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Group,
//                 key: 'group_id',
//             }
//         },
//         leader_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//             references: {
//                 model: Lector,
//                 key: 'lector_id',
//             }
//         },
//
//     });
//
//     Student.belongsTo(User, {
//         foreignKey: "user_id",
//         as: "user"
//     });
//
//     // Group.hasMany(Student, {
//     //     foreignKey: "student_id",
//     //     as: "student"});
//     // Student.belongsTo(Group, {
//     //     foreignKey: "group_id",
//     //     as: "group"
//     // });
//
//     Group.hasMany(Student);
//     Student.belongsTo(Group);
//
//     Student.belongsTo(Lector, {
//         foreignKey: "leader_id",
//         as: "leader"
//     });
//
//     // TODO: add row 'sec_event_id'
//
//
//     return Student;
// };