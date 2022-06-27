'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'FlagTypes',
      [
        {
          id: 'aa8dce29-a50b-45aa-82da-70b72fbef73e',
          flagTypeName: 'Sexual content',
          flagTypeInfo:
            'Content that include graphic sexual activity, nudity or other types of sexual activity',
          createdAt: '2020-12-11 22:21:05.651+00',
          updatedAt: '2021-01-06 15:02:24.875+00',
        },
        {
          id: 'aa8dce29-a50b-45aa-82da-70b72fbef73a',
          flagTypeName: 'Violent or repulsive content',
          flagTypeInfo: 'Content that include graphic or posted to shock users',
          createdAt: '2020-12-11 22:21:05.651+00',
          updatedAt: '2021-01-06 15:02:24.875+00',
        },
        {
          id: 'd0433aa0-38a9-11ec-8d3d-0242ac130003',
          flagTypeName: 'Hateful or abusive content',
          flagTypeInfo:
            'Content that promotes against protected groups, abuses vulnerable individuals or engaging in cyberbullying',
          createdAt: '2020-12-11 22:21:05.651+00',
          updatedAt: '2021-01-06 15:02:24.875+00',
        },
        {
          id: 'db6a542c-38a9-11ec-8d3d-0242ac130003',
          flagTypeName: 'Harassment or bullying',
          flagTypeInfo:
            'Content that threatens individuals or target them with prolonged or malicious insults',
          createdAt: '2020-12-11 22:21:05.651+00',
          updatedAt: '2021-01-06 15:02:24.875+00',
        },

        {
          id: 'e08735ba-38a9-11ec-8d3d-0242ac130003',
          flagTypeName: 'Other',
          flagTypeInfo:
            'Please describe what type of community guideline this content violet in the message box.',
          createdAt: '2020-12-11 22:21:05.651+00',
          updatedAt: '2021-01-06 15:02:24.875+00',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FlagTypes', null, {});
  },
};
