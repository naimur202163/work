'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('VideoCategoryRequests', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      categoryTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      categoryDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requestedUser: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      requestedUserEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VideoCategoryRequests', {
      force: true,
      cascade: true,
    });
  },
};
