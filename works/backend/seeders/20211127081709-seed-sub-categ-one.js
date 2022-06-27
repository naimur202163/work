'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SubCategOne', [
      { id: 1, name: 'Intensity', subCategType: 0, videoCategoryId: 1, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 2, name: 'Video Length', subCategType: 1, videoCategoryId: 1, allowOnlyOneSubCat: true, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 3, name: 'Class Style', subCategType: 0, videoCategoryId: 1, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 4, name: 'Search Film Type', subCategType: 0, videoCategoryId: 4, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 5, name: 'Genre', subCategType: 0, videoCategoryId: 4, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 6, name: 'Music Type', subCategType: 0, videoCategoryId: 3, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 7, name: 'Band', subCategType: 0, videoCategoryId: 3, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 8, name: 'Music Title', subCategType: 0, videoCategoryId: 3, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 9, name: 'Aerobics', subCategType: 0, videoCategoryId: 2, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 10, name: 'Muscle Strengthening', subCategType: 0, videoCategoryId: 2, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 11, name: 'Flexibility', subCategType: 0, videoCategoryId: 2, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 12, name: 'Dry Heat Cooking', subCategType: 0, videoCategoryId: 5, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 13, name: 'Combination Cooking', subCategType: 0, videoCategoryId: 5, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 14, name: 'Moist Heat Cooking', subCategType: 0, videoCategoryId: 5, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 15, name: 'Formal', subCategType: 0, videoCategoryId: 6, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 16, name: 'Informal', subCategType: 0, videoCategoryId: 6, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 17, name: 'Non-Formal', subCategType: 0, videoCategoryId: 6, allowOnlyOneSubCat: false, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SubCategOne', null, {});

  }
};
