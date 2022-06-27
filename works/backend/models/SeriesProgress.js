const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'SeriesProgress',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      seriesId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      percentage: {
        type: DataTypes.DECIMAL(),
        allowNull: true,
        defaultValue: 0,
      },
    },
    { timestamps: true }
  );
};
