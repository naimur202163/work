const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Emailer", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.INTEGER, // 0=queued, 1=sent, 2=failed  
      defaultValue: 0,
      allowNull: false,
    },
    emailType: {
      type: DataTypes.INTEGER, // e.g. 0=signup, 1=forgotPassword, etc.  
      defaultValue: 0,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });
};
