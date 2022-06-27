const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'VideoCategoryRequest',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      categoryTitle: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      categoryDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requestedUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestedUserEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
