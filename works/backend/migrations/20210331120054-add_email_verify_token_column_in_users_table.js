module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'email_verify_token',
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
      queryInterface.removeColumn('Users', 'email_verify_token'),
    ]);
  }
}