'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Moments', 'categoryId', {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'VideoCategories',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('Moments', 'categoryId')]);
  },
};
