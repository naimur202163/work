'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'HashTags',
      [
        {
          id: 'f40964ad-a090-44ce-8a08-07a7cbe0b969',
          name: 'Cooking',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: '4fd14263-d559-4efc-88be-9bef3a1739c5',
          name: 'Yoga',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HashTags', null, {});
  },
};
