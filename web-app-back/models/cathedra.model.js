const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Faculty = require('./faculty.model')(sequelize);
    const Cathedra = sequelize.define("cathedra", {
        cathedra_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cathedra_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fk_faculty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Faculty,
                key: 'faculty_id'
            }
        },
        cathedra_name_full: {
            type: DataTypes.STRING
        } },
    {
        tableName: 'cathedra'
    });

    Faculty.hasMany(Cathedra, {
        foreignKey: "fk_faculty",
        as: "cathedra"
    })
    Cathedra.belongsTo(Faculty, {
        foreignKey: "fk_faculty",
        as: "faculty"
    });
    return Cathedra;
};