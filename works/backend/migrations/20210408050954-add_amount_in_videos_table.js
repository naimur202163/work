module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Videos',
      'amount',
      {
        type: Sequelize.DECIMAL(10,5),
        allowNull: true,
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Videos',
      'amount'
    );
  }
}