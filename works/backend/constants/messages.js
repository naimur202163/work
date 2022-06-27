const MESSAGES = {
  INVALID_PARAMETERS: 'Invalid parameters.',
  MUST_BE_LOGGED_IN: 'You need to be logged in to visit this route',
  ACCESS_DENIED: "Authorization denied, only subscribed users can visit this route",
  ACCESS_DENIED_ONLY_ADMIN_ALLOWED: "Authorization denied, only admins can visit this route",
  STORAGE: {
    FIELD_IS_REQUIRED: 'All fields are required: size, name, cost, period.',
    PACKAGE_IS_ALREADY_EXISTS: 'A Storage package is already exists with this name or size or cost.',
    INVALID_ID: 'Invalid storage package id.',
    PACKAGE_NOT_EXISTS: 'Sorry, Storage Package does not exists.',
    PACKAGE_DELETED: 'Storage Package deleted successfully.',
  },
  AUTH: {
    EMAIL_IS_NOT_REGISTERED: "The email is not yet registered.",
    PASSWORD_NOT_MATCH: "The password does not match.",
    USER_NOT_FOUND: "No user found"
  },
  BADGE: {
    FIELD_IS_REQUIRED: 'All fields are required: visitorBadgeType, name, imgPath.',
    BADGE_TYPE_SHOULD_NUMBER: "Visitor badge type should be in Number",
    BADGE_ALREADY_EXISTS: "A badge is already exists with this name or image path",
    BADGE_TYPE_INVALID: 'please check your query parameter. Only free, basic and premium allowed',
    BADGE_DELETED: 'Badge deleted successfully.',
    BADGE_NOT_EXISTS: 'Sorry, badge does not exists.',
  },
  USER: {
    CANNOT_SUBSCRIBE_OWN_CHANNEL: "You cannot to subscribe to your own channel",
    NOT_FOUND: "User not found.",
  },
  USER_SETTING: {
    FIELD_IS_REQUIRED: 'All fields are mandatory',
    NO_USER_SETTING_FOUND: 'Sorry, no user settings exist with that ID',
    USER_SETTING_DELETED: "User Settings deleted successfully",
    USER_SETTING_UPDATED: "User settings info updated successfully",
  },
  VIDEO: {
    NO_VIDEO_FOUND: 'Sorry, No video found',
    ALREADY_VIEWED: "You already viewed this video",
    ENTER_SEARCH_TERM: 'Please enter the search term',
  },
  EMAILER: {
    INVALID_EMAIL_TOKEN: 'Invalid email verification token'
  },
  INVALID_EMAIL: 'Invalid email address',
  INVALID_USER_NAME: 'Invalid user name',
  SOME_THING_WENT_WRONG: 'Something went wrong' 
};

module.exports = { MESSAGES };
