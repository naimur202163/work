const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Comment', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    parent_id: {
      type: DataTypes.UUID,
    },
  });
