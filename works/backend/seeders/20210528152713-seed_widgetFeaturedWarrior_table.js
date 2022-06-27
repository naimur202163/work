'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'WidgetFeaturedWarriors',
      [
        {
          id: 'aa8dce29-a50b-45aa-82da-70b72fbef73e',
          title: 'El Feather',
          description:
            'Intuitive empath, Writing/Poetry, Yoga, Whole Health Living.',
          order: 0,
          featuredWarriorImgPathInternal:
            '/assets/featured_warriors/Danielle_Profile.jpg',
          featuredWarriorWidgetLocation: 2,
          categoryId: 1,
          createdAt: '2021-05-28 15:02:24.875+00',
          updatedAt: '2021-05-28 15:02:24.875+00',
        },
        {
          id: 'a26307f5-160e-44c6-9058-7fc1f148a5e3',
          title: 'Siena',
          description: 'Yoga With Siena',
          order: 1,
          featuredWarriorImgPathInternal:
            '/assets/featured_warriors/Siena.jpeg',
          featuredWarriorWidgetLocation: 2,
          categoryId: 1,
          createdAt: '2021-05-28 15:02:24.875+00',
          updatedAt: '2021-05-28 15:02:24.875+00',
        },
        {
          id: 'e1709aba-8993-4285-9b58-f1ded016c8c5',
          title: 'YOU!',
          description: 'Join the Co-Op!',
          order: 2,
          featuredWarriorImgPathInternal: '/assets/featured_warriors/You.jpeg',
          featuredWarriorWidgetLocation: 2,
          customUrl: 'https://isutra.app/',
          categoryId: 1,
          createdAt: '2021-05-28 15:02:24.875+00',
          updatedAt: '2021-05-28 15:02:24.875+00',
        },
        {
          id: 'ed9bc5e6-82a2-4e82-9fad-7c8f36507af0',
          title: 'Amanda',
          description: 'Om Girl Yoga',
          order: 3,
          featuredWarriorImgPathInternal:
            '/assets/featured_warriors/Amanda.jpeg',
          featuredWarriorWidgetLocation: 2,
          categoryId: 1,
          createdAt: '2021-05-28 15:02:24.875+00',
          updatedAt: '2021-05-28 15:02:24.875+00',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WidgetFeaturedWarriors', null, {});
  },
};
