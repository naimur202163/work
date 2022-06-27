'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('WidgetBannerSliders', 'bannerImgPathInternal', 'bannerImgPathInternal_XL_1920x400'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.renameColumn('WidgetBannerSliders', 'bannerImgPathInternal_XL_1920x400', 'bannerImgPathInternal')]);
  },

};
