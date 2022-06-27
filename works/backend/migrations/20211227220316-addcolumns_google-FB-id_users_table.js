'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'googleId', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('Users', 'facebookId', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'googleId'),
      queryInterface.removeColumn('Users', 'facebookId'),
    ]);
  },
};
