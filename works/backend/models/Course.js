const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 5),
        allowNull: true,
      },
    },
    { timestamps: true }
  );
  return Course;
};
