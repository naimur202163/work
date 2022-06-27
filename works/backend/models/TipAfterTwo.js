const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("TipAfterTwoUnlocks", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        videoId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        videoContentType: {
            type: DataTypes.INTEGER, // 0 = video , 1 = Moment , 2 = Live Stream
            allowNull: true,
          },
    });
