module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'StoragePackages',
        'stripeProduct',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('StoragePackages', 'stripeProduct'),
    ]);
  }
} 