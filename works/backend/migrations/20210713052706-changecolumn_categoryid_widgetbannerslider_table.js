'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('WidgetBannerSliders', 'categoryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('WidgetBannerSliders', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),
    ]);
  },
};
