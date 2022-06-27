'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'StoragePackages',
      [
        {
          id: '5c089c29-2167-4c86-90d6-87a690d87b1a',
          name: 'Ant Warrior Storage',
          size: 2000,
          cost: 1,
          period: 'Month (billed annually 20% off!)',
          order: 1,
          stripeProduct: 'price_1JXQpSFrBwhwu8k58br5D5MG', //test keys
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: '4a63629a-eadf-4066-8caf-ba1b962fa421',
          name: 'Snail Warrior Storage',
          size: 10000,
          cost: 3,
          order: 2,
          period: 'Monthly',
          stripeProduct: 'price_1IuezPFrBwhwu8k5Bkf5Ysp6', 
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: 'c551eaf1-2ad0-4fe6-b0d5-6097a4c2f9b1',
          name: 'Mouse Warrior Storage',
          size: 25000,
          cost: 6,
          order: 3,
          period: 'Monthly',
          stripeProduct: 'price_1IuoaIFrBwhwu8k57d1yWT1b',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: 'fbd1d007-8803-46a1-95fe-a3605de2ed1c',
          name: 'Lizard Warrior Storage',
          size: 50000,
          cost: 10,
          period: 'Monthly',
          order: 4,
          stripeProduct: 'price_1Iuf8MFrBwhwu8k5iU3hvOPE',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: 'c78c161b-facc-4062-9339-ce6a49fb3fa7',
          name: 'Armadillo Warrior Storage',
          size: 150000,
          cost: 20,
          order: 5,
          stripeProduct: 'price_1IufF8FrBwhwu8k50ry7tttj',
          period: 'Monthly',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: '8c64c837-9cab-4d26-a95b-7c2223ff99df',
          name: 'Crow Warrior Storage',
          size: 300000,
          cost: 20,
          order: 6,
          stripeProduct: 'price_1IufF8FrBwhwu8k50ry7tttj',
          period: 'Monthly',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: 'd3060c3e-3bc0-4841-b6d5-2da990dc8023',
          name: 'Bear Warrior Storage',
          size: 500000,
          cost: 50,
          order: 7,
          stripeProduct: 'price_1IuhPGFrBwhwu8k5q9RWKY7x',
          period: 'Monthly',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
        {
          id: 'a44c30d0-2b16-4944-80c7-b231b2d46afc',
          name: 'Elephant Warrior Storage',
          size: 1000000,
          cost: 75,
          order: 8,
          stripeProduct: 'price_1Iui1xFrBwhwu8k5y6mKq4J1',
          period: 'Monthly',
          createdAt: '2021-01-05T21:20:13.444+00:00',
          updatedAt: '2021-01-05T21:20:13.444+00:00',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StoragePackages', null, {});
  },
};
