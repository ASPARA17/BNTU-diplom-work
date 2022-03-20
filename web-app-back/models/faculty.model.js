const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const University = require('./university.model')(sequelize);
    const Faculty = sequelize.define("faculty", {
        faculty_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        faculty_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fk_university: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: University,
                key: 'university_id'
            }
        },
        faculty_name_full: {
            type: DataTypes.STRING,
            allowNull: false
        } },
        {
            tableName: 'faculty'
    });

    Faculty.belongsTo(University, {
        foreignKey: "fk_university",
        as: "university"
    });
    University.hasMany(Faculty, {
        foreignKey: "fk_university",
        as: "faculty"
    });
    return Faculty;
};