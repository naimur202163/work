'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'VideoSubCategories',
      [
        {
          id: 1,
          videoId: '04b740ee-e878-47ae-be3d-da5bc3e0f97a',
          videoCategoryId: 1,
          subCategOneId: 2,
          subCategTwoId: 2,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 2,
          videoId: '1358bc02-5063-441a-bfd0-b2eacf5a22a9',
          videoCategoryId: 3,
          subCategOneId: 1,
          subCategTwoId: 2,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 3,
          videoId: '2435ecd7-50da-464d-a6b4-b1beef472fa8',
          videoCategoryId: 2,
          subCategOneId: 2,
          subCategTwoId: 2,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 4,
          videoId: 'ed39c929-cfe4-4457-9d92-f47522ddff31',
          videoCategoryId: 1,
          subCategOneId: 3,
          subCategTwoId: 1,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 5,
          videoId: 'f3e4632a-ef3e-4ae9-b470-070e3f2d5e69',
          videoCategoryId: 2,
          subCategOneId: 1,
          subCategTwoId: 2,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 6,
          videoId: 'f3e4632a-ef3e-4ae9-b470-070e3f2d5e69',
          videoCategoryId: 2,
          subCategOneId: 1,
          subCategTwoId: 1,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 7,
          videoId: 'f3e4632a-ef3e-4ae9-b470-070e3f2d5e69',
          videoCategoryId: 2,
          subCategOneId: 1,
          subCategTwoId: 2,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 8,
          videoId: 'f3e4632a-ef3e-4ae9-b470-070e3f2d5e69',
          videoCategoryId: 3,
          subCategOneId: 1,
          subCategTwoId: 1,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 9,
          videoId: 'f3e4632a-ef3e-4ae9-b470-070e3f2d5e69',
          videoCategoryId: 4,
          subCategOneId: 1,
          subCategTwoId: 1,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
        {
          id: 10,
          videoId: '7a1d23bf-a61e-4783-8e4d-130c5082d073',
          videoCategoryId: 3,
          subCategOneId: 1,
          subCategTwoId: 1,
          createdAt: '2022-03-20 20:12:38.122+00',
          updatedAt: '2022-03-20 20:12:38.122+00',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VideoSubCategories', null, {});
  },
};
