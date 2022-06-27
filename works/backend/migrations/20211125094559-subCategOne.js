'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubCategOne', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      subCategType: {
        type: Sequelize.INTEGER
      },
      videoCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'VideoCategories',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubCategOne', {
      force: true,
      cascade: true,
    });
  },
};
