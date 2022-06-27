'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('VideoCategories', 'iconPath', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('VideoCategories', 'iconPath'),
    ]);
  },
};
