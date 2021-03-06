'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('WidgetFeaturedWarriors', 'warriorUserName', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('WidgetFeaturedWarriors', 'warriorUserName'),
    ]);
  },
};
