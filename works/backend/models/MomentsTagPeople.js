const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const MomentsTagPeoples = sequelize.define('MomentsTagPeoples', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    momentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  return MomentsTagPeoples;
};
