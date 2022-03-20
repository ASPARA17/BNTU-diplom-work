const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Cathedra = require('./cathedra.model')(sequelize);
    const Specialty = sequelize.define("specialty", {
        specialty_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fk_cathedra: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cathedra,
                key: 'cathedra_id'
            }
        },
        specialty_name: {
            type: DataTypes.STRING,
            //allowNull: false, TODO: may be true
        },
        specialty_name_full: {
            type: DataTypes.STRING,
            //allowNull: false, TODO: may be true
        },
        specialty_number: {
            type: DataTypes.STRING,
            //allowNull: false, TODO: may be true
        },
        }, {
            tableName: 'specialty'
    });

    Cathedra.hasMany(Specialty, {
        foreignKey: "fk_cathedra",
        as: "specialty"});
    Specialty.belongsTo(Cathedra, {
        foreignKey: "fk_cathedra",
        as: "cathedra"
    });
    return Specialty;
};