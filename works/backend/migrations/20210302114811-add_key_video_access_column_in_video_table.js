module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Videos',
      'keyVideoAccess',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'VideoAccessOverlays',
          key: 'keyVideoAccess',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Videos',
      'keyVideoAccess'
    );
  }
}