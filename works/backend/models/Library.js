const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Library", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        videoContentType: {
            type: DataTypes.INTEGER, // 0 = video , 1 = Moment , 2 = Live Stream
            allowNull: true,
          },
    });
};
