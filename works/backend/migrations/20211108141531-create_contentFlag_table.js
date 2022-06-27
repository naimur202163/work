('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ContentFlags', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      warriorUserId: {
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
      flagSubmitterUserId: {
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
      videoId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Videos',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      flagTypeId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'FlagTypes',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      flagTimestamp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flagMessage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ContentFlags', {
      force: true,
      cascade: true,
    });
  },
};
