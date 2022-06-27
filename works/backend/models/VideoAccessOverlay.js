const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("VideoAccessOverlay", {
        keyVideoAccess: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imgPathFreeLoader: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imgPathMember: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
};
