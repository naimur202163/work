'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),
    ]);
  },
};
