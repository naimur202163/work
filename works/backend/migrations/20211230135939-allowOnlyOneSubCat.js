'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('SubCategOne', 'allowOnlyOneSubCat', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('SubCategOne', 'allowOnlyOneSubCat')]);
  },
};