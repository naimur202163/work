'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('VideoAccessOverlays', [
      {
        keyVideoAccess: 0,
        name: "Free 4 All",
        description: "Free 4 All",
        imgPathFreeLoader: "/assets/overlays/free4all.png",
        imgPathMember: "/assets/overlays/free4all.png",
        createdAt: "2020-12-11 22:21:05.651+00",
        updatedAt: "2021-01-06 15:02:24.875+00"
      },
      {
        keyVideoAccess: 1,
        name: "Members Only",
        description: "Members Only",
        imgPathFreeLoader: "/assets/overlays/members_only.png",
        imgPathMember: "/assets/overlays/members_only.png",
        createdAt: "2020-12-11 22:21:05.651+00",
        updatedAt: "2021-01-06 15:02:24.875+00"
      },
      {
        keyVideoAccess: 2,
        name: "PAY PER VIEW",
        description: "PAY PER VIEW",
        imgPathFreeLoader: "/assets/overlays/pay_per_view.png",
        imgPathMember: "/assets/overlays/pay_per_view.png",
        createdAt: "2020-12-11 22:21:05.651+00",
        updatedAt: "2021-01-06 15:02:24.875+00"
      },
      {
        keyVideoAccess: 3,
        name: "Tip After Two",
        description: "Tip After Two",
        imgPathFreeLoader: "/assets/overlays/tip_after_two.png",
        imgPathMember: "/assets/overlays/tip_after_two.png",
        createdAt: "2020-12-11 22:21:05.651+00",
        updatedAt: "2021-01-06 15:02:24.875+00"
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('VideoAccessOverlays', null, {});

  }
};
