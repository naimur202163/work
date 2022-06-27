'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('VideoHashTags', 'momentId', {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Moments',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('VideoHashTags', 'momentId')]);
  },
};
