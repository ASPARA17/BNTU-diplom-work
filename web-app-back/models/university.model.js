const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const University = sequelize.define("university", {
        university_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        university_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        university_name_full: {
            type: DataTypes.STRING,
            allowNull: false
        } },
        {
            tableName: 'university'
    });

    return University;
};