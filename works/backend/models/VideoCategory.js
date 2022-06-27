const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) =>
  sequelize.define('VideoCategory', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    iconPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
