const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Notification", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    readstatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    entityid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    data: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
  });
};
