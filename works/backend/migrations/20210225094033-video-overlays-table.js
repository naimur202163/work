'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('VideoAccessOverlays', {
      keyVideoAccess: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imgPathFreeLoader: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imgPathMember: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VideoAccessOverlays');
  }
};
