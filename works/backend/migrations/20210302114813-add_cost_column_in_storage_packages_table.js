module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'StoragePackages',
        'cost',
        {
          type: Sequelize.DOUBLE,
          allowNull: false,
        }
      ),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('StoragePackages', 'cost'),
    ]);
  }
}