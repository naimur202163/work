'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'WidgetBannerSliders',
      [
        {
          "id": "2433ef8e-a843-4d2b-be7c-4c82fe65063c",
          "title": "Yoga for Everyone",
          "description": "Hunters first banner - Zander and friends",
          "button1Text": null,
          "button1Url": null,
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": 0,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/Landing banners/1920x400 Banner -Yoga for Everyone.jpg",
          "bannerImgPathBackup": null,
          "bannerLocation": 0,
          "categoryId": null,
          "createdAt": "2021-08-24 15:02:24.875+00",
          "updatedAt": "2021-08-24 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": "/assets/banners/Landing banners/1366x400  Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_L_1280x400": "/assets/banners/Landing banners/1280x400  Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_L_1024x400": "/assets/banners/Landing banners/1024x400  Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_MD_834x400": "/assets/banners/Landing banners/834x400 Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_SM_428x250": "/assets/banners/Landing banners/768x400 Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_MD_768x400": "/assets/banners/Landing banners/428x250  Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_SM_414x250": "/assets/banners/Landing banners/414x250 Banner -Yoga for Everyone.jpg",
          "bannerImgPathInternal_SM_375x250": "/assets/banners/Landing banners/375x250  Banner -Yoga for Everyone.jpg"
        },
        {
          "id": "52027c3e-c0bd-4737-87c5-521c508331a0",
          "title": "Yoga Category Test Top Banner",
          "description": null,
          "button1Text": null,
          "button1Url": null,
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": null,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/test banners/Category-yoga-test.jpg",
          "bannerImgPathBackup": null,
          "bannerLocation": 1,
          "categoryId": 1,
          "createdAt": "2021-05-28 15:02:24.875+00",
          "updatedAt": "2021-05-28 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": "/assets/banners/test banners/1366x400.jpg",
          "bannerImgPathInternal_L_1280x400": "/assets/banners/test banners/1280x400.jpg",
          "bannerImgPathInternal_L_1024x400": "/assets/banners/test banners/1024x400.jpg",
          "bannerImgPathInternal_MD_834x400": "/assets/banners/test banners/834x400.jpg",
          "bannerImgPathInternal_SM_428x250": "/assets/banners/test banners/768x400.jpg",
          "bannerImgPathInternal_MD_768x400": "/assets/banners/test banners/428x250.jpg",
          "bannerImgPathInternal_SM_414x250": "/assets/banners/test banners/414x250.jpg",
          "bannerImgPathInternal_SM_375x250": "/assets/banners/test banners/375x250.jpg"
        },
        {
          "id": "a1c03c79-fe86-45a9-96ef-3fd9a61d8a32",
          "title": "Forest Flow",
          "description": "Hunter banner for featured Free4all video of Amanda ~ Forest Flow",
          "button1Text": null,
          "button1Url": null,
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": 1,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/Landing banners/Banner_Forest Flow/1920x400 Banner - Forest Flow",
          "bannerImgPathBackup": null,
          "bannerLocation": 0,
          "categoryId": null,
          "createdAt": "2021-09-05 15:02:24.875+00",
          "updatedAt": "2021-09-05 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": "/assets/banners/Landing banners/Banner_Forest Flow/1366x400  Banner -Forest Flow.jpg",
          "bannerImgPathInternal_L_1280x400": "/assets/banners/Landing banners/Banner_Forest Flow/1280x400  Banner -Forest Flow.jpg",
          "bannerImgPathInternal_L_1024x400": "/assets/banners/Landing banners/Banner_Forest Flow/1024x400  Banner -Forest Flow.jpg",
          "bannerImgPathInternal_MD_834x400": "/assets/banners/Landing banners/Banner_Forest Flow/834x400 Banner -Forest Flow.jpg",
          "bannerImgPathInternal_SM_428x250": "/assets/banners/Landing banners/Banner_Forest Flow/768x400 Banner -Forest Flow.jpg",
          "bannerImgPathInternal_MD_768x400": "/assets/banners/Landing banners/Banner_Forest Flow/428x250  Banner -Forest Flow.jpg",
          "bannerImgPathInternal_SM_414x250": "/assets/banners/Landing banners/Banner_Forest Flow/414x250 Banner -Forest Flow.jpg",
          "bannerImgPathInternal_SM_375x250": "/assets/banners/Landing banners/Banner_Forest Flow/375x250  Banner -Forest Flow.jpg"
        },
        {
          "id": "a486716e-1e9e-4a0e-8041-8e6476e4fbe9",
          "title": "A Social Co-Op, A Better Way to Watch",
          "description": "No Advertisements Allowed. No Unnecessary Data Collection. No Censorship.",
          "button1Text": "Try it!",
          "button1Url": "https://isutra.app/signup",
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": 0,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/bg-image-32.jpeg",
          "bannerImgPathBackup": null,
          "bannerLocation": 2,
          "categoryId": null,
          "createdAt": "2021-05-28 15:02:24.875+00",
          "updatedAt": "2021-05-28 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": null,
          "bannerImgPathInternal_L_1280x400": null,
          "bannerImgPathInternal_L_1024x400": null,
          "bannerImgPathInternal_MD_834x400": null,
          "bannerImgPathInternal_SM_428x250": null,
          "bannerImgPathInternal_MD_768x400": null,
          "bannerImgPathInternal_SM_414x250": null,
          "bannerImgPathInternal_SM_375x250": null
        },
        {
          "id": "de6aff6c-d2f4-43dc-adfb-f44f5401f4b6",
          "title": "The new way to W A T C H",
          "description": "CO-OP CONTENT TUBE iSUTRA is the world’ first Social Media Co-Op. We are now in charge. Not Advertisers. Everyone can profit now… not just “influencers”.",
          "button1Text": "Join the Co-Op!",
          "button1Url": "https://isutra.app/signup",
          "button2Text": "Learn More",
          "button2Url": "http://isutra.tv",
          "featured": false,
          "order": 1,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/siteimage.jpeg",
          "bannerImgPathBackup": null,
          "bannerLocation": 2,
          "categoryId": null,
          "createdAt": "2021-05-28 15:02:24.875+00",
          "updatedAt": "2021-05-28 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": null,
          "bannerImgPathInternal_L_1280x400": null,
          "bannerImgPathInternal_L_1024x400": null,
          "bannerImgPathInternal_MD_834x400": null,
          "bannerImgPathInternal_SM_428x250": null,
          "bannerImgPathInternal_MD_768x400": null,
          "bannerImgPathInternal_SM_414x250": null,
          "bannerImgPathInternal_SM_375x250": null
        },
        {
          "id": "e9ab92c9-2cec-44e6-8478-db6fae8d6a25",
          "title": "Social Media 2.0",
          "description": "Hunter Banner for warrior portal home",
          "button1Text": null,
          "button1Url": null,
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": 0,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/Landing banners/Warrior Portal/1920x400 Banner - Socail Media 2.0.jpg",
          "bannerImgPathBackup": null,
          "bannerLocation": 4,
          "categoryId": null,
          "createdAt": "2021-09-03 15:02:24.875+00",
          "updatedAt": "2021-09-03 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": "/assets/banners/Landing banners/Warrior Portal/1366x400  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_L_1280x400": "/assets/banners/Landing banners/Warrior Portal/1280x400  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_L_1024x400": "/assets/banners/Landing banners/Warrior Portal/1024x400  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_MD_834x400": "/assets/banners/Landing banners/Warrior Portal/834x400 Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_SM_428x250": "/assets/banners/Landing banners/Warrior Portal/768x400 Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_MD_768x400": "/assets/banners/Landing banners/Warrior Portal/428x250  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_SM_414x250": "/assets/banners/Landing banners/Warrior Portal/414x250 Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_SM_375x250": "/assets/banners/Landing banners/Warrior Portal/375x250  Banner -Social Media 2.0.jpg"
        },
        {
          "id": "effede0f-0532-44e2-9340-ceda7df6fa6d",
          "title": "A Social Co-Op, A Better Way to Watch",
          "description": null,
          "button1Text": null,
          "button1Url": null,
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": 2,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/DAbstractBackground.jpeg",
          "bannerImgPathBackup": null,
          "bannerLocation": 2,
          "categoryId": null,
          "createdAt": "2021-05-28 15:02:24.875+00",
          "updatedAt": "2021-05-28 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": null,
          "bannerImgPathInternal_L_1280x400": null,
          "bannerImgPathInternal_L_1024x400": null,
          "bannerImgPathInternal_MD_834x400": null,
          "bannerImgPathInternal_SM_428x250": null,
          "bannerImgPathInternal_MD_768x400": null,
          "bannerImgPathInternal_SM_414x250": null,
          "bannerImgPathInternal_SM_375x250": null
        },
        {
          "id": "f0362f55-5041-4f91-b7ff-b94a651c1a02",
          "title": null,
          "description": null,
          "button1Text": "Leanr More",
          "button1Url": "https://isutra.tv",
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": null,
          "bannerImgPathInternal_XL_1920x400": "/assets/banners/Landing banners/Warrior Portal/1920x400 Banner - Socail Media 2.0.jpg",
          "bannerImgPathBackup": "NULL",
          "bannerLocation": 5,
          "categoryId": null,
          "createdAt": "2021-05-28 15:02:24.875+00",
          "updatedAt": "2021-05-28 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": "/assets/banners/Landing banners/Warrior Portal/1366x400  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_L_1280x400": "/assets/banners/Landing banners/Warrior Portal/1280x400  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_L_1024x400": "/assets/banners/Landing banners/Warrior Portal/1024x400  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_MD_834x400": "/assets/banners/Landing banners/Warrior Portal/834x400 Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_SM_428x250": "/assets/banners/Landing banners/Warrior Portal/768x400 Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_MD_768x400": "/assets/banners/Landing banners/Warrior Portal/428x250  Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_SM_414x250": "/assets/banners/Landing banners/Warrior Portal/414x250 Banner -Social Media 2.0.jpg",
          "bannerImgPathInternal_SM_375x250": "/assets/banners/Landing banners/Warrior Portal/375x250  Banner -Social Media 2.0.jpg"
        },
        {
          "id": "f93f510b-23e5-4928-a815-912c7a80217f",
          "title": "A true Disrupter... iSutra shakes the concept of Social Media to its very foundation... and builds it back up justly.",
          "description": null,
          "button1Text": null,
          "button1Url": null,
          "button2Text": null,
          "button2Url": null,
          "featured": false,
          "order": 3,
          "bannerImgPathInternal_XL_1920x400": null,
          "bannerImgPathBackup": "https://bernardmarr.com/img/The%20Most%20Motivational%20Leadership%20Quotes%20for%202018.png",
          "bannerLocation": 2,
          "categoryId": null,
          "createdAt": "2021-05-28 15:02:24.875+00",
          "updatedAt": "2021-05-28 15:02:24.875+00",
          "bannerImgPathInternal_L_1366x400": null,
          "bannerImgPathInternal_L_1280x400": null,
          "bannerImgPathInternal_L_1024x400": null,
          "bannerImgPathInternal_MD_834x400": null,
          "bannerImgPathInternal_SM_428x250": null,
          "bannerImgPathInternal_MD_768x400": null,
          "bannerImgPathInternal_SM_414x250": null,
          "bannerImgPathInternal_SM_375x250": null
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WidgetBannerSliders', null, {});
  },
};
