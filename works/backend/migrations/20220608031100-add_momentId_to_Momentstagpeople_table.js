'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('MomentsTagPeoples', 'momentId', {
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
    return Promise.all([queryInterface.removeColumn('MomentsTagPeoples', 'momentId')]);
  },
};
