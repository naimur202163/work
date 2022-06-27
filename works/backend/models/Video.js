const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    featuredWarriorPortal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customThumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filesize: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    keyVideoAccess: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: true,
    },
    videoLength: {
      type: DataTypes.DECIMAL(),
      allowNull: true,
    },
  });
  return Video;
};
