
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'Comments',
        'Comments_userId_fkey',
        { transaction }
      );
      await queryInterface.addConstraint('Comments', {
        type: 'foreign key',
        fields: ['userId'],
        name: 'Comments_userId_fkey',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'Comments',
        'Comments_userId_fkey',
        { transaction }
      );
      await queryInterface.addConstraint('Comments', {
        type: 'foreign key',
        fields: ['userId'],
        name: 'Comments_userId_fkey',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};