const pg = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const UserModel = require('./models/User');
const VideoModel = require('./models/Video');
const VideoLikeModel = require('./models/VideoLike');
const CommentModel = require('./models/Comment');
const SubscriptionModel = require('./models/Subscription');
const ViewModel = require('./models/View');
const EmailerModel = require('./models/Emailer');
const UserNotificationStatusModel = require('./models/UserNotificationStatus');
const NotificationTypeModel = require('./models/NotificationType');
const NotificationCategoryModel = require('./models/NotificationCategory');
const NotificationModel = require('./models/Notification');
const VideoCategoryModel = require('./models/VideoCategory');
const HashTagModel = require('./models/HashTag');
const VideoHashTagModel = require('./models/VideoHashTag');
const VisitorBadgeModel = require('./models/VisitorBadge');
const VideoAccessOverlayModel = require('./models/VideoAccessOverlay');
const UserDisplaySettingsModel = require('./models/UserDisplaySettings');
const OnlineUsersModel = require('./models/OnlineUsers');
const StoragePackagesModel = require('./models/StoragePackages');
const ReferralsModel = require('./models/Referrals');
const PPVUnlocksModel = require('./models/PPVUnlocks');
const WidgetBannerSliderModel = require('./models/WidgetBannerSlider');
const WidgetFeaturedWarriorModel = require('./models/WidgetFeaturedWarrior');
const LibraryModel = require('./models/Library');
const TipAfterTwoModel = require('./models/TipAfterTwo');
const VideoCategoryRequestModel = require('./models/VideoCategoryRequest');
const ContentFlagModel = require('./models/ContentFlag');
const FlagTypeModel = require('./models/FlagType');
const SubCategOneModel = require('./models/SubCategOne');
const SubCategTwoModel = require('./models/SubCategTwo');
const VideoSubCategoriesModel = require('./models/VideoSubCategories');
const PlaylistModel = require('./models/Playlist');
const LiveClassScheduleModel = require('./models/LiveClassSchedules');
const PlaylistVideosModel = require('./models/PlaylistVideos');
const SeriesModel = require('./models/Series');
const SeriesVideoModel = require('./models/SeriesVideos');
const SeriesProgressModel = require('./models/SeriesProgress');
const ProgressVideoModel = require('./models/ProgressVideos');
const MomentsModel = require('./models/Moments');
const ConnectionsModel = require('./models/Connections');
const MomentsTagPeopleModel = require('./models/MomentsTagPeople');
const config = require('./config/config');
pg.defaults.ssl = true;
// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000 // keep this low to reduce calls taking too long
  },
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = UserModel(sequelize, DataTypes);
const Video = VideoModel(sequelize, DataTypes);
const VideoLike = VideoLikeModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Subscription = SubscriptionModel(sequelize, DataTypes);
const View = ViewModel(sequelize, DataTypes);
const Emailer = EmailerModel(sequelize, DataTypes);
const UserNotificationStatus = UserNotificationStatusModel(
  sequelize,
  DataTypes
);
const NotificationCategory = NotificationCategoryModel(sequelize, DataTypes);
const NotificationType = NotificationTypeModel(sequelize, DataTypes);
const Notification = NotificationModel(sequelize, DataTypes);
const OnlineUsers = OnlineUsersModel(sequelize, DataTypes);
const StoragePackages = StoragePackagesModel(sequelize, DataTypes);
const Referrals = ReferralsModel(sequelize, DataTypes);
const PPVUnlocks = PPVUnlocksModel(sequelize, DataTypes);
const WidgetBannerSlider = WidgetBannerSliderModel(sequelize, DataTypes);
const WidgetFeaturedWarrior = WidgetFeaturedWarriorModel(sequelize, DataTypes);
const Library = LibraryModel(sequelize, DataTypes);
const VideoCategory = VideoCategoryModel(sequelize, DataTypes);
const HashTag = HashTagModel(sequelize, DataTypes);
const VideoHashTag = VideoHashTagModel(sequelize, DataTypes);
const VisitorBadge = VisitorBadgeModel(sequelize, DataTypes);
const UserDisplaySettings = UserDisplaySettingsModel(sequelize, DataTypes);
const VideoAccessOverlay = VideoAccessOverlayModel(sequelize, DataTypes);
const TipAfterTwo = TipAfterTwoModel(sequelize, DataTypes);
const VideoCategoryRequest = VideoCategoryRequestModel(sequelize, DataTypes);
const ContentFlag = ContentFlagModel(sequelize, DataTypes);
const FlagType = FlagTypeModel(sequelize, DataTypes);
const SubCategOne = SubCategOneModel(sequelize, DataTypes);
const SubCategTwo = SubCategTwoModel(sequelize, DataTypes);
const VideoSubCategories = VideoSubCategoriesModel(sequelize, DataTypes);
const Playlist = PlaylistModel(sequelize, DataTypes);
const LiveClassSchedule = LiveClassScheduleModel(sequelize, DataTypes);
const PlaylistVideos = PlaylistVideosModel(sequelize, DataTypes);
const Series = SeriesModel(sequelize, DataTypes);
const SeriesVideos = SeriesVideoModel(sequelize, DataTypes);
const SeriesProgress = SeriesProgressModel(sequelize, DataTypes);
const ProgressVideo = ProgressVideoModel(sequelize, DataTypes);
const Moments = MomentsModel(sequelize, DataTypes);
const Connections = ConnectionsModel(sequelize, DataTypes);
const MomentsTagPeople = MomentsTagPeopleModel(sequelize, DataTypes);

// notification - user association
User.hasMany(Notification, { foreignKey: 'actorid' });
User.hasMany(Notification, { foreignKey: 'notifierid' });
Notification.belongsTo(User, { as: 'Actor', foreignKey: 'actorid' });
Notification.belongsTo(User, { as: 'Notifier', foreignKey: 'notifierid' });

// notification - notificationtype association
NotificationType.hasOne(Notification, { foreignKey: 'typeid' });
Notification.belongsTo(NotificationType, { foreignKey: 'typeid' });

// notificationtype - notificationcategory association
NotificationCategory.hasMany(NotificationType, { foreignKey: 'categoryid' });

// notificationsetting - notificationcategory association
NotificationCategory.hasMany(UserNotificationStatus, {
  foreignKey: 'categoryId',
});

// video - user association
Video.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Video, { foreignKey: 'userId' });

// user - notification association
User.hasMany(UserNotificationStatus, { foreignKey: 'userId' });

// userDisplaySettings - user association
VisitorBadge.hasMany(UserDisplaySettings, {
  foreignKey: 'visitorBadgeId',
});
UserDisplaySettings.belongsTo(VisitorBadge, { foreignKey: 'visitorBadgeId' });
UserDisplaySettings.belongsTo(User, { foreignKey: 'userId' });

// video to category lookup association
VideoCategory.hasMany(Video, { foreignKey: 'categoryId' });

VideoAccessOverlay.hasMany(Video, { foreignKey: 'keyVideoAccess' });
Video.belongsTo(VideoAccessOverlay, { foreignKey: 'keyVideoAccess' });
// likes association
User.belongsToMany(Video, { through: VideoLike, foreignKey: 'userId' });
Video.belongsToMany(User, { through: VideoLike, foreignKey: 'videoId' });

// comments association
User.hasMany(Comment, {
  foreignKey: 'userId',
});
Comment.belongsTo(Video, { foreignKey: 'videoId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Comment, { foreignKey: 'parent_id' });

Comment.hasMany(Comment, {
  foreignKey: 'parent_id',
});

Video.hasMany(Comment, {
  foreignKey: 'videoId',
});

// subscription association
User.hasMany(Subscription, {
  foreignKey: 'subscribeTo',
});

// views association
User.belongsToMany(Video, { through: View, foreignKey: 'userId' });
Video.belongsToMany(User, { through: View, foreignKey: 'videoId' });

// emailer - user association
Emailer.belongsTo(User, { foreignKey: 'userId' });

// videoAccessOverlay association

// OnlineUsers - user association
OnlineUsers.belongsTo(User, { foreignKey: 'userid' });

User.belongsTo(StoragePackages, { foreignKey: 'storagePackageId' });

// Referrals - user association
Referrals.belongsTo(User, { foreignKey: 'refer_by' });
Referrals.belongsTo(User, { foreignKey: 'refer_to' });

//Video - hashtag association
Video.hasMany(VideoHashTag, { foreignKey: 'videoId' });
Moments.hasMany(VideoHashTag, { foreignKey: 'momentId' });
VideoHashTag.belongsTo(HashTag, { foreignKey: 'hashTagId' });
VideoHashTag.belongsTo(Video, { foreignKey: 'videoId' });
VideoHashTag.belongsTo(Moments, { foreignKey: 'momentId'});

//PPVUnlocks
Video.hasMany(PPVUnlocks, { foreignKey: 'videoId' });
PPVUnlocks.belongsTo(User, { foreignKey: 'userId' });
PPVUnlocks.belongsTo(Video, { foreignKey: 'videoId' });

//WidgetBannerSlider & WidgetFeaturedWarrior - Category association
VideoCategory.hasMany(WidgetBannerSlider, { foreignKey: 'categoryId' });
VideoCategory.hasMany(WidgetFeaturedWarrior, { foreignKey: 'categoryId' });

//WidgetFeaturedWarrior - User association
WidgetFeaturedWarrior.belongsTo(User, { foreignKey: 'userId' });

//Libray association
User.belongsToMany(Video, { through: Library, foreignKey: 'userId' });
Video.belongsToMany(User, { through: Library, foreignKey: 'videoId' });

//TipAfterTwo Associations
Video.hasMany(TipAfterTwo, { foreignKey: 'videoId' });
TipAfterTwo.belongsTo(User, { foreignKey: 'userId' });
TipAfterTwo.belongsTo(Video, { foreignKey: 'videoId' });

// VideoCategory Associations - SubCategOne Assosiation
VideoCategory.hasMany(SubCategOne, {
  foreignKey: 'videoCategoryId',
  as: 'subCategOne',
});

// VideoCategory Associations - SubCategOne Assosiation
SubCategOne.hasMany(SubCategTwo, {
  foreignKey: 'subCategOneId',
  as: 'subCategTwo',
});

// VideoSubCategories assosiation
Video.hasMany(VideoSubCategories, { foreignKey: 'videoId' });
SubCategOne.hasMany(VideoSubCategories, { foreignKey: 'subCategOneId' });
SubCategTwo.hasMany(VideoSubCategories, { foreignKey: 'subCategTwoId' });

// Moments - User assosiation
Moments.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Moments, { foreignKey: 'userId' });

// Connections - User to Warrior/Collaborator assosiation
User.hasMany(Connections, { foreignKey: 'WarriorUserId' });
User.hasMany(Connections, { foreignKey: 'CollaboratorUserId' });

// MomentsTagPeople - WarriorUserId to TaggedUserId assosiation
User.hasMany(MomentsTagPeople, { foreignKey: 'WarriorUserId' });
User.hasMany(MomentsTagPeople, { foreignKey: 'TaggedUserId' });

module.exports = {
  User,
  Video,
  VideoLike,
  Comment,
  Subscription,
  View,
  Emailer,
  UserNotificationStatus,
  Notification,
  NotificationType,
  NotificationCategory,
  VideoCategory,
  HashTag,
  VideoHashTag,
  VisitorBadge,
  UserDisplaySettings,
  VideoAccessOverlay,
  OnlineUsers,
  StoragePackages,
  Referrals,
  PPVUnlocks,
  WidgetBannerSlider,
  WidgetFeaturedWarrior,
  Library,
  LiveClassSchedule,
  TipAfterTwo,
  VideoCategoryRequest,
  ContentFlag,
  FlagType,
  SubCategOne,
  SubCategTwo,
  VideoSubCategories,
  Playlist,
  PlaylistVideos,
  Series,
  SeriesVideos,
  SeriesProgress,
  ProgressVideo,
  Moments,
  Connections,
  MomentsTagPeople,
};
