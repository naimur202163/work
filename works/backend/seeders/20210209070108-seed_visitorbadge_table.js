'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('VisitorBadges', [
      {
        id: 1,
        visitorBadgeType: 0,
        name: "Ape Freeloader",
        imgPath: "/assets/badges/freeloader/Ape Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 2,
        visitorBadgeType: 0,
        name: "Bear Freeloader",
        imgPath: "/assets/badges/freeloader/Bear Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 3,
        visitorBadgeType: 0,
        name: "Buck Freeloader",
        imgPath: "/assets/badges/freeloader/Buck Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 4,
        visitorBadgeType: 0,
        name: "Bull Freeloader",
        imgPath: "/assets/badges/freeloader/Bull Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      // {
      //   id: 5,
      //   visitorBadgeType: 0,
      //   name: "Caraboo Freeloader",
      //   imgPath: "/assets/badges/freeloader/Caraboo Freeloader.png",
      //   createdAt: "02-02-21",
      //   updatedAt: "02-02-21"
      // },
      {
        id: 6,
        visitorBadgeType: 0,
        name: "Cow Freeloader",
        imgPath: "/assets/badges/freeloader/Cow Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 7,
        visitorBadgeType: 0,
        name: "Eagle Freeloader",
        imgPath: "/assets/badges/freeloader/Eagle Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 8,
        visitorBadgeType: 0,
        name: "Elephant Freeloader",
        imgPath: "/assets/badges/freeloader/Elephant Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 9,
        visitorBadgeType: 0,
        name: "Gator Freeloader",
        imgPath: "/assets/badges/freeloader/Gator Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      // {
      //   id: 10,
      //   visitorBadgeType: 0,
      //   name: "Giraffe Freeloader",
      //   imgPath: "/assets/badges/freeloader/Giraffe Freeloader.png",
      //   createdAt: "02-02-21",
      //   updatedAt: "02-02-21"
      // },
      // {
      //   id: 11,
      //   visitorBadgeType: 0,
      //   name: "Hawk Freeloader",
      //   imgPath: "/assets/badges/freeloader/Hawk Freeloader.png",
      //   createdAt: "02-02-21",
      //   updatedAt: "02-02-21"
      // },
      {
        id: 12,
        visitorBadgeType: 0,
        name: "Hippo Freeloader",
        imgPath: "/assets/badges/freeloader/Hippo Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 13,
        visitorBadgeType: 0,
        name: "Horse Freeloader",
        imgPath: "/assets/badges/freeloader/Horse Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 14,
        visitorBadgeType: 0,
        name: "Lion Freeloader",
        imgPath: "/assets/badges/freeloader/Lion Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 15,
        visitorBadgeType: 0,
        name: "Lizard Freeloader",
        imgPath: "/assets/badges/freeloader/Lizard Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 16,
        visitorBadgeType: 0,
        name: "Owl Freeloader",
        imgPath: "/assets/badges/freeloader/Owl Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 17,
        visitorBadgeType: 0,
        name: "Parrot Freeloader",
        imgPath: "/assets/badges/freeloader/Parrot Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 18,
        visitorBadgeType: 0,
        name: "Rabbit Freeloader",
        imgPath: "/assets/badges/freeloader/Rabbit Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 19,
        visitorBadgeType: 0,
        name: "Rhino Freeloader",
        imgPath: "/assets/badges/freeloader/Rhino Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 20,
        visitorBadgeType: 0,
        name: "Seal Freeloader",
        imgPath: "/assets/badges/freeloader/Seal Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 21,
        visitorBadgeType: 0,
        name: "Snake Freeloader",
        imgPath: "/assets/badges/freeloader/Snake Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      // {
      //   id: 22,
      //   visitorBadgeType: 0,
      //   name: "Tiger Freeloader",
      //   imgPath: "/assets/badges/freeloader/Tiger Freeloader.png",
      //   createdAt: "02-02-21",
      //   updatedAt: "02-02-21"
      // },
      {
        id: 23,
        visitorBadgeType: 0,
        name: "Turtle Freeloader",
        imgPath: "/assets/badges/freeloader/Turtle Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 24,
        visitorBadgeType: 0,
        name: "Wolf Freeloader",
        imgPath: "/assets/badges/freeloader/Wolf Freeloader.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 101,
        visitorBadgeType: 1,
        name: "Dolphin Clan",
        imgPath: "/assets/badges/tribe/Dolphin Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 102,
        visitorBadgeType: 1,
        name: "Elephant Clan",
        imgPath: "/assets/badges/tribe/Elephant Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 103,
        visitorBadgeType: 1,
        name: "Horse Clan",
        imgPath: "/assets/badges/tribe/Horse Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 104,
        visitorBadgeType: 1,
        name: "Lizard Clan",
        imgPath: "/assets/badges/tribe/Lizard Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 105,
        visitorBadgeType: 1,
        name: "Mantis Clan",
        imgPath: "/assets/badges/tribe/Mantis Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 106,
        visitorBadgeType: 1,
        name: "Octopus Clan",
        imgPath: "/assets/badges/tribe/Octopus Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 107,
        visitorBadgeType: 1,
        name: "Owl Clan",
        imgPath: "/assets/badges/tribe/Owl Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 109,
        visitorBadgeType: 1,
        name: "Penguin Clan",
        imgPath: "/assets/badges/tribe/Penguin Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 110,
        visitorBadgeType: 1,
        name: "Rabbit Clan",
        imgPath: "/assets/badges/tribe/Rabbit Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 122,
        visitorBadgeType: 1,
        name: "Rat Pack",
        imgPath: "/assets/badges/tribe/Rat Pack.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 111,
        visitorBadgeType: 1,
        name: "Rhino Pack",
        imgPath: "/assets/badges/tribe/Rhino Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 112,
        visitorBadgeType: 1,
        name: "The Crows",
        imgPath: "/assets/badges/tribe/The Crows.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 113,
        visitorBadgeType: 1,
        name: "The Dragonflies",
        imgPath: "/assets/badges/tribe/The Dragonflies.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 114,
        visitorBadgeType: 1,
        name: "The Foxes",
        imgPath: "/assets/badges/tribe/The Foxes.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 116,
        visitorBadgeType: 1,
        name: "The Serpents",
        imgPath: "/assets/badges/tribe/The Serpents.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 117,
        visitorBadgeType: 1,
        name: "The Spiders",
        imgPath: "/assets/badges/tribe/The Spiders.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 118,
        visitorBadgeType: 1,
        name: "Thunderbird Clan",
        imgPath: "/assets/badges/tribe/Thunderbird Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 119,
        visitorBadgeType: 1,
        name: "Turtle Clan",
        imgPath: "/assets/badges/tribe/Turtle Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 120,
        visitorBadgeType: 1,
        name: "Wolf Pack",
        imgPath: "/assets/badges/tribe/Wolf Pack.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 121,
        visitorBadgeType: 1,
        name: "Zebra Clan",
        imgPath: "/assets/badges/tribe/Zebra Clan.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 201,
        visitorBadgeType: 2,
        name: "Ape Warriors",
        imgPath: "/assets/badges/warrior/Ape Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 202,
        visitorBadgeType: 2,
        name: "Bear Warriors",
        imgPath: "/assets/badges/warrior/Bear Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 203,
        visitorBadgeType: 2,
        name: "Buddha Warriors",
        imgPath: "/assets/badges/warrior/Buddha Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 204,
        visitorBadgeType: 2,
        name: "Dream Warriors",
        imgPath: "/assets/badges/warrior/Dream Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 205,
        visitorBadgeType: 2,
        name: "Elephant Warriors",
        imgPath: "/assets/badges/warrior/Elephant Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 206,
        visitorBadgeType: 2,
        name: "Lion Warriors",
        imgPath: "/assets/badges/warrior/Lion Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 207,
        visitorBadgeType: 2,
        name: "Lotus Warriors",
        imgPath: "/assets/badges/warrior/Lotus Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 208,
        visitorBadgeType: 2,
        name: "Maniac Warriors",
        imgPath: "/assets/badges/warrior/Maniac Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 209,
        visitorBadgeType: 2,
        name: "Moon Warriors",
        imgPath: "/assets/badges/warrior/Moon Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 210,
        visitorBadgeType: 2,
        name: "Panther Warriors",
        imgPath: "/assets/badges/warrior/Panther Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 211,
        visitorBadgeType: 2,
        name: "Pirate Warriors",
        imgPath: "/assets/badges/warrior/Pirate Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 212,
        visitorBadgeType: 2,
        name: "Sun Warriors",
        imgPath: "/assets/badges/warrior/Sun Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 214,
        visitorBadgeType: 2,
        name: "Tree Goddess Warriors",
        imgPath: "/assets/badges/warrior/Tree Goddess Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 215,
        visitorBadgeType: 2,
        name: "Whale Warriors",
        imgPath: "/assets/badges/warrior/Whale Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
      {
        id: 216,
        visitorBadgeType: 2,
        name: "Ying Yang Warriors",
        imgPath: "/assets/badges/warrior/Ying Yang Warriors.png",
        createdAt: "02-02-21",
        updatedAt: "02-02-21"
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('VisitorBadges', null, {});

  }
};
