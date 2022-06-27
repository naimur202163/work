module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'StoragePackages',
        'order',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('StoragePackages', 'order'),
    ]);
  }
}