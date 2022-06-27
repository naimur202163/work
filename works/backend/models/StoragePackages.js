 const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("StoragePackages", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    size: {
      type: DataTypes.DOUBLE, 
      allowNull: false,
    },
    cost: {
      type: DataTypes.DOUBLE, 
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stripeProduct: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
