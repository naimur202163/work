'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Series', 
      [
        {
          "id": "11fb1ddb-4daf-4acb-87e1-e9f27cb1b2f7",
          "title": "Test post bug fixes",
          "description": "test",
          "thumbnail": "https://res.cloudinary.com/dmseyfyof/image/upload/v1647806990/media/uax0n5ihzafug1t1zs6q.jpg",
          "price": 50,
          "userId": "aca66699-1781-47b2-a782-f18c0470f462",
          "publicId": "media/uax0n5ihzafug1t1zs6q",
          "createdAt": "2022-03-20 20:09:56.355+00",
          "updatedAt": "2022-03-20 20:09:56.355+00"
        },
        {
          "id": "2ccfa011-2988-4067-8242-354a17e23574",
          "title": "Fitness & Health guide to live longer",
          "description": "This this series to make your health better in this modern world where nature is becoming more polutated. ",
          "thumbnail": "https://res.cloudinary.com/isutra/image/upload/v1645087450/isutra-media/blob_eismgh.jpg",
          "price": 25.99,
          "userId": "5d462d00-f290-4666-9900-322550c3033a",
          "publicId": "isutra-media/blob_eismgh",
          "createdAt": "2022-02-17 08:45:11.229+00",
          "updatedAt": "2022-02-18 05:28:58.363+00"
        },
        {
          "id": "32301f39-8bf8-4175-8cc1-ea3fbe8d12a6",
          "title": "Hunter Series 1",
          "description": "Test",
          "thumbnail": "https://res.cloudinary.com/dmseyfyof/image/upload/v1645414934/media/mxzzlbmecyhf2yxzucxo.png",
          "price": 15,
          "userId": "1ef7a6e3-17e1-4259-9e58-06eaf14fbd04",
          "publicId": "media/mxzzlbmecyhf2yxzucxo",
          "createdAt": "2022-02-21 03:42:24.661+00",
          "updatedAt": "2022-02-21 03:42:24.661+00"
        },
        {
          "id": "3281393b-38be-4cfc-b7b1-a0021dc4c2b7",
          "title": "The Chef test series",
          "description": "Test",
          "thumbnail": "https://res.cloudinary.com/dmseyfyof/image/upload/v1646266335/media/u5c445c3mrtteylupfw7.jpg",
          "price": 34,
          "userId": "aca66699-1781-47b2-a782-f18c0470f462",
          "publicId": "media/u5c445c3mrtteylupfw7",
          "createdAt": "2022-03-03 00:12:24.982+00",
          "updatedAt": "2022-03-03 00:12:24.982+00"
        },
        {
          "id": "6a3dc954-b5d3-410b-bcff-506f5b7f74db",
          "title": "SERIES PURCHASE FINAL TEST",
          "description": "",
          "thumbnail": "https://res.cloudinary.com/isutra/image/upload/v1645163524/isutra-media/blob_dnzv8m.png",
          "price": 99.99,
          "userId": "5d462d00-f290-4666-9900-322550c3033a",
          "publicId": "isutra-media/blob_dnzv8m",
          "createdAt": "2022-02-18 05:52:08.912+00",
          "updatedAt": "2022-02-18 05:52:08.912+00"
        },
        {
          "id": "c54cc115-1714-4ec7-9bb5-66d0d899f9a6",
          "title": "Welcome to gatsby and strapi course",
          "description": "",
          "thumbnail": "https://res.cloudinary.com/isutra/image/upload/v1645161213/isutra-media/blob_jinlgp.jpg",
          "price": 50,
          "userId": "5d462d00-f290-4666-9900-322550c3033a",
          "publicId": "isutra-media/blob_jinlgp",
          "createdAt": "2022-02-18 05:13:37.991+00",
          "updatedAt": "2022-03-04 05:09:41.337+00"
        }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Series', null, {});

  }
};
