'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('VideoCategories', 'order', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('VideoCategories', 'order')]);
  },
};
