const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Role = sequelize.define("roles", {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING,
        }
    });
    return Role;
};