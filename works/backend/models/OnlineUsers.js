const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) =>
  sequelize.define('OnlineUsers', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    socketid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
