'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('VideoCategories', 

    [
      {
        "id": 1,
        "name": "Yoga",
        "featured": true,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-10-06 14:15:44.049+00",
        "order": 0,
        "iconPath": "/assets/icons/yoga.svg"
      },
      {
        "id": 2,
        "name": "Cooking",
        "featured": true,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-10-06 14:24:26.474+00",
        "order": 3,
        "iconPath": "/assets/icons/cooking.svg"
      },
      {
        "id": 3,
        "name": "Causes",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 4,
        "name": "Sports",
        "featured": true,
        "createdAt": "2021-10-02 12:21:05.651+00",
        "updatedAt": "2021-10-06 14:21:50.274+00",
        "order": 1,
        "iconPath": "/assets/icons/sport.svg"
      },
      {
        "id": 5,
        "name": "Cinema",
        "featured": true,
        "createdAt": "2021-10-02 12:21:05.651+00",
        "updatedAt": "2021-10-06 14:23:07.303+00",
        "order": 2,
        "iconPath": "/assets/icons/cinema.svg"
      },
      {
        "id": 6,
        "name": "Fitness",
        "featured": true,
        "createdAt": "2021-10-02 12:21:05.651+00",
        "updatedAt": "2021-10-06 14:25:42.823+00",
        "order": 4,
        "iconPath": "/assets/icons/fitness.svg"
      },
      {
        "id": 7,
        "name": "Music",
        "featured": true,
        "createdAt": "2021-10-02 12:21:05.651+00",
        "updatedAt": "2021-10-06 14:27:26.748+00",
        "order": 5,
        "iconPath": "/assets/icons/music.svg"
      },
      {
        "id": 8,
        "name": "Knowledge & Education",
        "featured": true,
        "createdAt": "2021-10-02 12:21:05.651+00",
        "updatedAt": "2021-10-06 14:28:30.986+00",
        "order": 6,
        "iconPath": "/assets/icons/knowledge.svg"
      },
      {
        "id": 9,
        "name": "Podcasts",
        "featured": true,
        "createdAt": "2021-10-02 12:21:05.651+00",
        "updatedAt": "2021-10-06 14:29:24.108+00",
        "order": 7,
        "iconPath": "/assets/icons/podcast.svg"
      },
      {
        "id": 10,
        "name": "Charity",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 11,
        "name": "Astrology",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 12,
        "name": "Health",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 13,
        "name": "Nutrition",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 14,
        "name": "Travel",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 15,
        "name": "Surfing",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 16,
        "name": "Lectures",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 17,
        "name": "Gardening",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 18,
        "name": "Plant Medicine",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 19,
        "name": "Animal Medicine",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 20,
        "name": "News",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 21,
        "name": "Golf",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
      {
        "id": 22,
        "name": "Pets",
        "featured": false,
        "createdAt": "2020-12-11 22:21:05.651+00",
        "updatedAt": "2021-01-06 15:02:24.875+00",
        "order": null,
        "iconPath": null
      },
    ],
    
    {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('VideoCategories', null, {});

  }
};
