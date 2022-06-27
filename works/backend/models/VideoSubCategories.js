const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) =>
    sequelize.define('VideoSubCategories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        videoId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        videoContentType: {
            type: DataTypes.INTEGER, // 0 = video , 1 = Moment , 2 = Live Stream
            allowNull: true,
          },
        videoCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false,
        },
        subCategOneId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false,
        },
        subCategTwoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
    }, {
        timestamps: true, freezeTableName: true,
    });
