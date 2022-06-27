('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('SeriesVideos', {
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
      seriesId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Series',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('SeriesVideos', {
      force: true,
      cascade: true,
    });
  },
};
