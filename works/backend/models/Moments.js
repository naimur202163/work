const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Moments = sequelize.define('Moments', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    caption: {
      type: DataTypes.STRING,
    },
    whoCanWatch: {
      // 0 = Everyone , 1 = Connections , 2 = Only Me
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    whoCanMessage: {
      // 0 = Everyone , 1 = Connections, 2 = Warriors
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    featuredFormorder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    staffPick: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    staffPickFormOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coverImgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    videoLength: {
      type: DataTypes.DECIMAL(),
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  return Moments;
};
