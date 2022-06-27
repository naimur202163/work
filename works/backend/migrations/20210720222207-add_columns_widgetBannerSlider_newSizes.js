module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_L_1366x400',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_L_1280x400',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_L_1024x400',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_MD_834x400',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_MD_768x400',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_SM_428x250',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_SM_414x250',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'WidgetBannerSliders',
        'bannerImgPathInternal_SM_375x250',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_L_1366x400'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_L_1280x400'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_L_1024x400'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_MD_834x400'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_MD_768x400'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_SM_428x250'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_SM_414x250'),
      queryInterface.removeColumn('WidgetBannerSliders', 'bannerImgPathInternal_SM_375x250'),
    ]);
  }
}