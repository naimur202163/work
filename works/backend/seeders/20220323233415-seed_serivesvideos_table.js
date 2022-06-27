'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SeriesVideos',
    [
      {
        "id": "846761d5-8126-463d-ab89-c10edce3020f",
        "videoId": "f829b50b-7707-4808-98e6-71a5aecef73f",
        "seriesId": "11fb1ddb-4daf-4acb-87e1-e9f27cb1b2f7",
        "order": 2,
        "createdAt": "2022-03-20 20:12:38.122+00",
        "updatedAt": "2022-03-20 20:12:38.122+00"
      },
      {
        "id": "343bddef-e88d-4fef-b107-8730009c96cd",
        "videoId": "430f14d8-aefa-4d15-924f-cad19068cbd9",
        "seriesId": "11fb1ddb-4daf-4acb-87e1-e9f27cb1b2f7",
        "order": 1,
        "createdAt": "2022-03-20 20:11:49.832+00",
        "updatedAt": "2022-03-20 20:11:49.832+00"
      },
      {
        "id": "3ebd5c04-3c00-4616-9265-96a617a9dd96",
        "videoId": "d4ac7a63-5aae-4bd3-aca6-24ff680451d1",
        "seriesId": "3281393b-38be-4cfc-b7b1-a0021dc4c2b7",
        "order": 1,
        "createdAt": "2022-03-03 00:13:12.455+00",
        "updatedAt": "2022-03-03 00:13:29.76+00"
      },
      {
        "id": "8bbc8c58-6100-46ab-aa91-c7664898d5c8",
        "videoId": "d9345592-93ca-4f1c-9223-79abb8607fec",
        "seriesId": "3281393b-38be-4cfc-b7b1-a0021dc4c2b7",
        "order": 3,
        "createdAt": "2022-03-03 00:13:04.892+00",
        "updatedAt": "2022-03-03 00:13:29.506+00"
      },
      {
        "id": "faf625bb-98a8-4c87-a724-a572bab87302",
        "videoId": "2435ecd7-50da-464d-a6b4-b1beef472fa8",
        "seriesId": "3281393b-38be-4cfc-b7b1-a0021dc4c2b7",
        "order": 2,
        "createdAt": "2022-03-03 00:12:29.136+00",
        "updatedAt": "2022-03-03 00:13:29.223+00"
      },
      {
        "id": "b6cf53e1-63f3-4239-a35f-a97135df31d1",
        "videoId": "fb46e0d6-2ffd-47bd-a2ef-d6abe7a2ba0d",
        "seriesId": "2ccfa011-2988-4067-8242-354a17e23574",
        "order": 4,
        "createdAt": "2022-02-25 14:29:04.122+00",
        "updatedAt": "2022-02-25 14:29:04.122+00"
      },
      {
        "id": "1b7067b6-dfa2-4886-88ec-955bdd1298cd",
        "videoId": "c6027f93-d2c7-40e6-bd30-0a9fe20975a2",
        "seriesId": "2ccfa011-2988-4067-8242-354a17e23574",
        "order": 3,
        "createdAt": "2022-02-22 14:14:13.443+00",
        "updatedAt": "2022-02-22 14:14:13.443+00"
      },
      {
        "id": "5fc42a5c-2277-4c7d-8902-68a5c254f7c0",
        "videoId": "4859d744-01be-4c3b-a43b-bc00ac51ee65",
        "seriesId": "32301f39-8bf8-4175-8cc1-ea3fbe8d12a6",
        "order": 3,
        "createdAt": "2022-02-21 03:52:55.17+00",
        "updatedAt": "2022-02-21 03:52:55.17+00"
      },
      {
        "id": "8f6617ea-bd54-426a-9531-efafff474a69",
        "videoId": "aa170945-94b3-42a0-8e18-19a2d9d8bfe1",
        "seriesId": "32301f39-8bf8-4175-8cc1-ea3fbe8d12a6",
        "order": 3,
        "createdAt": "2022-02-21 03:52:55.163+00",
        "updatedAt": "2022-02-21 03:52:55.163+00"
      },
      {
        "id": "282340fe-e1d5-42ea-8957-c6d6a901085c",
        "videoId": "20e61135-d8df-4e7d-a802-beadb837d260",
        "seriesId": "32301f39-8bf8-4175-8cc1-ea3fbe8d12a6",
        "order": 3,
        "createdAt": "2022-02-21 03:52:55.056+00",
        "updatedAt": "2022-02-21 03:52:55.056+00"
      },
      {
        "id": "76743b73-1de6-4fee-a508-87f37d6317bc",
        "videoId": "af5e755f-bd6d-429f-a130-626285919bc1",
        "seriesId": "32301f39-8bf8-4175-8cc1-ea3fbe8d12a6",
        "order": 1,
        "createdAt": "2022-02-21 03:43:05.836+00",
        "updatedAt": "2022-02-21 03:43:22.694+00"
      },
      {
        "id": "b8151fd0-8518-443b-a2b0-54537c851206",
        "videoId": "5388b821-3a49-497f-af97-937e9885333a",
        "seriesId": "32301f39-8bf8-4175-8cc1-ea3fbe8d12a6",
        "order": 2,
        "createdAt": "2022-02-21 03:42:58.881+00",
        "updatedAt": "2022-02-21 03:43:22.697+00"
      },
      {
        "id": "73bc473e-9a6a-42a9-8398-d1538480b6b7",
        "videoId": "b6234b87-e395-4a94-ae1e-9f156b560fbd",
        "seriesId": "6a3dc954-b5d3-410b-bcff-506f5b7f74db",
        "order": 2,
        "createdAt": "2022-02-18 05:52:15.863+00",
        "updatedAt": "2022-02-18 05:52:15.863+00"
      },
      {
        "id": "0778d0d3-0359-45f2-acf5-49dbdd430c53",
        "videoId": "17113d6d-13b9-4f47-984c-af5ee0e4909f",
        "seriesId": "6a3dc954-b5d3-410b-bcff-506f5b7f74db",
        "order": 1,
        "createdAt": "2022-02-18 05:52:12.326+00",
        "updatedAt": "2022-02-18 05:52:12.326+00"
      },
      {
        "id": "7df06db9-f1ff-4288-aac4-7af0f3b92bae",
        "videoId": "870125e5-4ead-4534-9c6b-e88233003d5e",
        "seriesId": "c54cc115-1714-4ec7-9bb5-66d0d899f9a6",
        "order": 3,
        "createdAt": "2022-02-18 05:13:50.867+00",
        "updatedAt": "2022-02-18 05:13:50.867+00"
      },
      {
        "id": "71b1da52-9933-44af-84cc-20a713133e82",
        "videoId": "b6234b87-e395-4a94-ae1e-9f156b560fbd",
        "seriesId": "c54cc115-1714-4ec7-9bb5-66d0d899f9a6",
        "order": 2,
        "createdAt": "2022-02-18 05:13:47.489+00",
        "updatedAt": "2022-02-18 05:13:47.489+00"
      },
      {
        "id": "cd5421c1-26c1-4376-b4fe-33b566c280ff",
        "videoId": "17113d6d-13b9-4f47-984c-af5ee0e4909f",
        "seriesId": "c54cc115-1714-4ec7-9bb5-66d0d899f9a6",
        "order": 1,
        "createdAt": "2022-02-18 05:13:43.89+00",
        "updatedAt": "2022-02-18 05:13:43.89+00"
      },
      {
        "id": "90a23ea1-01f9-4b89-b781-4fefb6219d08",
        "videoId": "17113d6d-13b9-4f47-984c-af5ee0e4909f",
        "seriesId": "2ccfa011-2988-4067-8242-354a17e23574",
        "order": 2,
        "createdAt": "2022-02-17 08:50:15.184+00",
        "updatedAt": "2022-02-17 08:50:15.184+00"
      },
      {
        "id": "cabb6f4c-2c04-4397-9888-acdf338d16c4",
        "videoId": "870125e5-4ead-4534-9c6b-e88233003d5e",
        "seriesId": "2ccfa011-2988-4067-8242-354a17e23574",
        "order": 1,
        "createdAt": "2022-02-17 08:48:05.897+00",
        "updatedAt": "2022-02-17 08:48:05.897+00"
      }
    ]
    , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SeriesVideos', null, {});

  }
};
