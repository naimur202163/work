const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,        
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      avatarPublicId: {
        type: DataTypes.STRING,
      },
      cover: {
        type: DataTypes.STRING,
        defaultValue:
          'https://res.cloudinary.com/dmseyfyof/image/upload/v1617374099/media/rnvkypjwbig46qqxcuzp.png',
      },
      coverPublicId: {
        type: DataTypes.STRING,
      },
      channelDescription: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userrole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // 0 = basic, 1 = Tribe, 2 = Warrior (content creator / upload)
      },
      stripe_account_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      stripe_customer_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email_verify_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      resetpw_token_created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      tagline: {
        type: DataTypes.STRING,
        length: 400,
        allowNull: true,
        defaultValue: null,
      },
      agreedToLicense: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );
};
