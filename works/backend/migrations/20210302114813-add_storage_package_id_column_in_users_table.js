module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'storagePackageId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'StoragePackages',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users',
      'storagePackageId'
    );
  }
}