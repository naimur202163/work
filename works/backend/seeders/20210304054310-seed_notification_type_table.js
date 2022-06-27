'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'NotificationTypes',
      [
        {
          id: '7a1daaf9-2bc4-4629-b1da-718e9166d2b5',
          name: 'new_comment',
          sentence: 'commented on:',
          description: 'Notification For New Comment',
          createdAt: '2021-01-05T15:20:34.862+00:00',
          updatedAt: '2021-01-05T15:20:34.862+00:00',
          categoryid: '4a4e1bb9-fa3d-4e56-bfff-0d44ac510bbf',
        },
        {
          id: '0499b914-6438-4e33-8527-ab54b185db9d',
          name: 'new_subscription',
          sentence: ' has has followed your Channel Stream',
          description: 'Notification For New Subscription',
          createdAt: '2021-01-05T15:20:35.107+00:00',
          updatedAt: '2021-01-05T15:20:35.107+00:00',
          categoryid: '222fa4e5-d6fb-4362-a99d-d4ec8db1b852',
        },
        {
          id: '0499b914-6438-4e33-8527-ab54b185db9f',
          name: 'stripe_onboarding',
          sentence: 'You must connect your account to be able to receive payments for your videos. Click here to connect your account',
          description: 'Notification for newly registered user',
          createdAt: '2021-01-05T15:20:35.107+00:00',
          updatedAt: '2021-01-05T15:20:35.107+00:00',
          categoryid: '222fa4e5-d6fb-4362-a99d-d4ec8db1b853',
        },
        {
          id: '0499b914-6438-4e33-8527-ab54b185db8f',
          name: 'tip',
          sentence: 'Great work! You have just received Karma from $1 in the amount of $$2!',
          description: 'Notification For tip',
          createdAt: '2021-01-05T15:20:35.107+00:00',
          updatedAt: '2021-01-05T15:20:35.107+00:00',
          categoryid: '222fa4e5-d6fb-4362-a99d-d4ec8db1b863',
        },
        {
          id: '550638c2-aa8f-11eb-b414-061bce7f90f2',
          name: 'stripe_connected',
          sentence: 'Awesome! Your Warrior account is now connected and ready to receive Karma Tips! You can begin uploading videos & receive payments for your quality content! Click this message or the Video Camera Upload icon in the top navigation bar.',
          description: 'Notification for stripe account connected successfully',
          createdAt: '2021-05-01T20:37:35.107+00:00',
          updatedAt: '2021-05-01T20:37:35.107+00:00',
          categoryid: '05bd6fa6-aa8f-11eb-b414-061bce7f90f2',
        },
        {
          id: '4d00e9d5-136c-4c54-b5b6-18dd828bbd18',
          name: 'referral_payment',
          sentence: 'Wow! You just got a referral from <username_from_referral>! There is another $2.50 in the bank!',
          description: 'Notification for referral payment',
          createdAt: '2021-05-02T20:37:35.107+00:00',
          updatedAt: '2021-05-02T20:37:35.107+00:00',
          categoryid: 'a4fe9f9c-c751-49dc-8602-9a9ab82571ef',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('NotificationTypes', null, {});
  },
};
