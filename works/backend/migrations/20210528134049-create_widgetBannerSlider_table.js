'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('WidgetBannerSliders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4, 
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      button1Text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      button1Url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      button2Text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      button2Url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bannerImgPathInternal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bannerImgPathExternal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bannerLocation: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'VideoCategories',
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WidgetBannerSliders');
  }
};