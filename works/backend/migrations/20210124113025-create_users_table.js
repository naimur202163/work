'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatarPublicId: {
        type: Sequelize.STRING,
      },
      cover: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/dmseyfyof/image/upload/v1617374099/media/rnvkypjwbig46qqxcuzp.png'
      },
      coverPublicId: {
        type: Sequelize.STRING,
      },
      channelDescription: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userrole: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0 = basic, 1 = Tribe, 2 = Warrior (content creator / upload)
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
    return queryInterface.dropTable('Users', {
      force: true,
      cascade: true
    });
  }
};
