'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('VisitorBadges', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      visitorBadgeType: {
        type: Sequelize.INTEGER, // 0=Freeloader, 1=Tribe, 2=Warrior
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgPath: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "/path/imgfilelocation.png",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VisitorBadges');
  }
};
