const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'LiveClassSchedules',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startHour: {
          type: DataTypes.STRING,
          allowNull: false
      },
      startMinute:{
          type: DataTypes.STRING,
          allowNull: false
      },
      endHour: {
        type: DataTypes.STRING,
        allowNull: false
      },
      endMinute: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    { timestamps: true }
  );
};
