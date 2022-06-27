module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Videos',
        'featuredWarriorPortal',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Videos', 'featuredWarriorPortal'),
    ]);
  }
}