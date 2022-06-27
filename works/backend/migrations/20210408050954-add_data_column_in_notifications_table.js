module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Notifications',
        'data',
        {
          type: Sequelize.JSONB,
          allowNull: true,
        }
      ),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Notifications', 'data'),
    ]);
  }
}