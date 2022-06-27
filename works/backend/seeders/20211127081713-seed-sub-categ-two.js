'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SubCategTwo', [
      { id: 1, name: 'Slow Flow', subCategOneId: 1, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 2, name: 'Power Yoga', subCategOneId: 1, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 3, name: 'Meditation', subCategOneId: 1, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 4, name: '15', subCategOneId: 2, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 5, name: '30', subCategOneId: 2, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 6, name: '60', subCategOneId: 2, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 7, name: '90', subCategOneId: 2, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 8, name: 'Warm up', subCategOneId: 3, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 9, name: 'Cool Down', subCategOneId: 3, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 10, name: 'Feature films', subCategOneId: 4, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 11, name: 'Animated Films', subCategOneId: 4, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 12, name: 'Short Films', subCategOneId: 4, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 13, name: 'Documentary Films', subCategOneId: 4, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 14, name: 'Comedy', subCategOneId: 5, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 15, name: 'Horror', subCategOneId: 5, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 16, name: 'Romance', subCategOneId: 5, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 17, name: 'Action', subCategOneId: 5, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 18, name: 'Pop', subCategOneId: 6, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 19, name: 'Rock', subCategOneId: 6, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 20, name: 'Jazz', subCategOneId: 6, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 21, name: 'Band One', subCategOneId: 7, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 22, name: 'Band two', subCategOneId: 7, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 23, name: 'Band three', subCategOneId: 7, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 24, name: 'Title one', subCategOneId: 8, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 25, name: 'Title Two', subCategOneId: 8, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 26, name: 'Title three', subCategOneId: 8, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 27, name: 'Aerobics One', subCategOneId: 9, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 28, name: 'Aerobics two', subCategOneId: 9, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 29, name: 'Aerobics Three', subCategOneId: 9, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 30, name: 'ms one', subCategOneId: 10, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 31, name: 'ms two', subCategOneId: 10, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 32, name: 'ms three', subCategOneId: 10, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 33, name: 'fs one', subCategOneId: 11, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 34, name: 'fs two', subCategOneId: 11, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 35, name: 'fs three', subCategOneId: 11, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 36, name: 'dh one', subCategOneId: 12, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 37, name: 'dh two', subCategOneId: 12, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 38, name: 'cc one', subCategOneId: 13, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 39, name: 'cc two', subCategOneId: 13, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 40, name: 'mh one', subCategOneId: 14, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 41, name: 'mh two', subCategOneId: 14, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 42, name: 'formal one', subCategOneId: 15, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 43, name: 'formal two', subCategOneId: 15, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 44, name: 'informal one', subCategOneId: 16, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 45, name: 'informal two', subCategOneId: 16, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 46, name: 'non formal one', subCategOneId: 17, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
      { id: 47, name: 'no formal two', subCategOneId: 17, createdAt: '11-11-2024', updatedAt: '11-11-2024' },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SubCategTwo', null, {});

  }
};
