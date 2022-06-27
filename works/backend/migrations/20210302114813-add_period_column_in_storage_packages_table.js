module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'StoragePackages',
        'period',
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('StoragePackages', 'period'),
    ]);
  }
}