const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("View", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    videoContentType: {
      type: DataTypes.INTEGER, // 0 = video , 1 = Moment , 2 = Live Stream
      allowNull: true,
    },
  });
