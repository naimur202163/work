const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const WidgetBannerSlider = sequelize.define('WidgetBannerSlider', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button1Text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button1Url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button2Text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button2Url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bannerImgPathInternal_XL_1920x400: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_L_1366x400: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_L_1280x400: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_L_1024x400: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_MD_834x400: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_MD_768x400: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_SM_428x250: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_SM_414x250: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathInternal_SM_375x250: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImgPathBackup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // home page top banner = 0, category page top banner = 1, warrior portal marketing slider = 2, Warrior Portal Top Banner = 4, Signup referral URL banner = 5
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // foreign key to the Categories table
    },
  });
  return WidgetBannerSlider;
};
