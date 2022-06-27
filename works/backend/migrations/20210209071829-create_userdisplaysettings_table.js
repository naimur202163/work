'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserDisplaySettings', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      outOfThisWorld: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      proContentProducer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      partnerContentCreator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      contactViaEmail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      visitorBadgeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'VisitorBadges',
          },
          key: 'id'
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
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserDisplaySettings');
  }
};
