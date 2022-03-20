const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Specialty = require('./specialty.model')(sequelize);
    const Group = sequelize.define("groups", {
        group_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fk_specialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Specialty,
                key: 'specialty_id',
            }
        }
    });

    Specialty.hasMany(Group, {
        foreignKey: 'fk_specialty',
        as: 'group'
    });
    Group.belongsTo(Specialty, {
        foreignKey: 'fk_specialty',
        as: 'specialty'
    });
    return Group;
};