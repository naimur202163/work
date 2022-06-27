const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const WidgetFeaturedWarrior = sequelize.define('WidgetFeaturedWarrior', {
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
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    customUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    featuredWarriorImgPathInternal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featuredWarriorImgPathExternal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featuredWarriorWidgetLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // home page slider = 0, category page slider = 1, warrior portal = 2
    },
  });
  return WidgetFeaturedWarrior;
};
