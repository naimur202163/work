const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'SubCategOne',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subCategType: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            videoCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            allowOnlyOneSubCat: {
                type: DataTypes.BOOLEAN,
            }
        },
        {
            timestamps: true, freezeTableName: true,
        }
    );
};
