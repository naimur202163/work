const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'SubCategTwo',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subCategOneId: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true, freezeTableName: true,
        }
    );
};
