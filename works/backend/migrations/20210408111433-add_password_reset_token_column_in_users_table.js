module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'password_reset_token',
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'password_reset_token'),
    ]);
  }
}