const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Referrals', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    refer_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    refer_to: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
