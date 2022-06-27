('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProgressVideos', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
      seriesProgressId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'SeriesProgresses',
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
    return queryInterface.dropTable('ProgressVideos', {
      force: true,
      cascade: true,
    });
  },
};
