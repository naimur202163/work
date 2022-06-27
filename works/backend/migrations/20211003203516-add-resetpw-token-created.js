module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'resetpw_token_created',
        {
          type: Sequelize.DATE,
          allowNull: true,
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'resetpw_token_created'),
    ]);
  }
}