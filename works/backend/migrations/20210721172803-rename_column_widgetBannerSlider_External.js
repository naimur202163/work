'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('WidgetBannerSliders', 'bannerImgPathExternal', 'bannerImgPathBackup'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.renameColumn('WidgetBannerSliders', 'bannerImgPathBackup', 'bannerImgPathExternal')]);
  },

};
