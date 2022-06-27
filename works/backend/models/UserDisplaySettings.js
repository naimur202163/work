const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("UserDisplaySettings", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    outOfThisWorld: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proContentProducer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    partnerContentCreator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    contactViaEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });