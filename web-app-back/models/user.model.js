const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Role =  require('./role.model')(sequelize);
    const User = sequelize.define("users", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_login: {
            type: DataTypes.STRING,
        },
        user_password: {
            type: DataTypes.STRING,
        },
        user_first_name: {
            type: DataTypes.STRING,
        },
        user_second_name: {
            type: DataTypes.STRING,
        },
        user_middle_name: {
            type: DataTypes.STRING,
        },
        user_confirm: {
            type: DataTypes.BOOLEAN,
        }
    });

    Role.hasMany(User, {
        foreignKey: "role_id",
        as: "users"});
    User.belongsTo(Role, {
        foreignKey: "role_id",
        as: "role",
    });

    return User;
};