const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'PlaylistVideo',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      videoId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      playlistId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    
    },
    { timestamps: true }
  );
};
