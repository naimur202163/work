module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'is_email_verified',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'is_email_verified'),
    ]);
  }
}