'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      readstatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      entityid: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: false,
      },
      actorid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {         
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      notifierid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {         
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      typeid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {         
          model: 'NotificationTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('Notifications');
  }
};
