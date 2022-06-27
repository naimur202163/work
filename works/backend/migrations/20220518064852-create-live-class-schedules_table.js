'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('LiveClassSchedules', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startHour: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startMinute: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endHour: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endMinute: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('LiveClassSchedules');
  }
};
