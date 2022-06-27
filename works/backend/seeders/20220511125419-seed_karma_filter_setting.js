'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'KarmaFilterSettings',
      [
        {
          id: 'f40964ad-a090-44ce-8a08-07a7cbe0b969',
          timeFrame: 'always',
          amount: 'any',
          source: 'all',
          filterType: 1, // transaction filters = 1, karma filters =2
          userId: '5d462d00-f290-4666-9900-322550c3033a',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',

        },
        {
          id: 'f40964ad-a090-44ce-8a08-07a7cbe0b968',
          timeFrame: 'always',
          amount: 'any',
          source: 'all',
          filterType: 2, // transaction filters = 1, karma filters =2
          userId: '5d462d00-f290-4666-9900-322550c3033a',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',

        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('KarmaFilterSettings', null, {});
  },
};
