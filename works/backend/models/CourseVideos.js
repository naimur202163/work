const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'CourseVideos',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      videoId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
