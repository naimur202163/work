'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'NotificationCategories',
      [
        {
          id: '4a4e1bb9-fa3d-4e56-bfff-0d44ac510bbf',
          name: 'Comment',
          description: 'Notification For Comment Operations',
          createdAt: '2021-01-05T15:20:34.808+00:00',
          updatedAt: '2021-01-05T15:20:34.808+00:00',
        },
        // {
        //   id: '2611138b-a335-436c-8a50-59ac88b297b2',
        //   name: 'Payment',
        //   description: 'Notification For Payment Operations',
        //   createdAt: '2021-01-05T15:20:34.962+00:00',
        //   updatedAt: '2021-01-05T15:20:34.962+00:00',
        // },
        {
          id: '222fa4e5-d6fb-4362-a99d-d4ec8db1b852',
          name: 'Subscription',
          description: 'Notification For Subscription Operations',
          createdAt: '2021-01-05T15:20:35.057+00:00',
          updatedAt: '2021-01-05T15:20:35.057+00:00',
        },
        {
          id: '222fa4e5-d6fb-4362-a99d-d4ec8db1b853',
          name: 'stripe_onboarding',
          description: 'Notification For stripe onboarding',
          createdAt: '2021-01-05T15:20:35.057+00:00',
          updatedAt: '2021-01-05T15:20:35.057+00:00',
        },
        {
          id: '222fa4e5-d6fb-4362-a99d-d4ec8db1b863',
          name: 'tip',
          description: 'Notification For tip',
          createdAt: '2021-01-05T15:20:35.057+00:00',
          updatedAt: '2021-01-05T15:20:35.057+00:00',
        },
        {
          id: '05bd6fa6-aa8f-11eb-b414-061bce7f90f2',
          name: 'stripe_connected',
          description: 'Notification for stripe account connected successfully',
          createdAt: '2021-05-01T20:37:35.107+00:00',
          updatedAt: '2021-05-01T20:37:35.107+00:00',
        },
        {
          id: 'a4fe9f9c-c751-49dc-8602-9a9ab82571ef',
          name: 'referral_payment',
          description: 'Notification for referral registeration successfully',
          createdAt: '2021-05-02T20:37:35.107+00:00',
          updatedAt: '2021-05-02T20:37:35.107+00:00',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('NotificationCategories', null, {});
  },
};
