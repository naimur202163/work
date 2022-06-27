const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ContentFlags',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      warriorUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      flagSubmitterUserId: {
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
      flagTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      flagTimestamp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      flagMessage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
