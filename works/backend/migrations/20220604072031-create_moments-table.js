('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Moments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      caption: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      whoCanWatch: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      whoCanMessage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      featuredFormorder: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      staffPick: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      staffPickFormOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      coverImgUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileSize: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      videoLength: {
        type: Sequelize.DECIMAL(),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Moments', {
      force: true,
      cascade: true,
    });
  },
};
