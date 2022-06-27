('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Connections', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      collaborate: {
        type: Sequelize.BOOLEAN, // if true = warrior wants to collaborate
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      WarriorUserId: {
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
      CollaboratorUserId: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Connections', {
      force: true,
      cascade: true,
    });
  },
};
