'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('PPVUnlocks', 'seriesId', {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: 'Series',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('PPVUnlocks', 'seriesId')]);
  },
};
