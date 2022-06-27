 const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("VisitorBadge", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    visitorBadgeType: {
      type: DataTypes.INTEGER, // 0=Freeloader, 1=Tribe, 2=Warrior
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgPath: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "/path/imgfilelocation.png",
    }
  });
