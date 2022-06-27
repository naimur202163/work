const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ProgressVideo',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      videoId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      seriesProgressId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
