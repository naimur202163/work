module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'stripe_account_id',
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'stripe_customer_id',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'stripe_account_id'),
      queryInterface.removeColumn('Users', 'stripe_customer_id')
    ]);
  }
}