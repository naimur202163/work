const EMAIL_STATUS = {
    QUEUED: 0,
    SENT: 1,
    FAILED: 2,
};

const EMAIL_TYPE = {
    SIGN_UP: 0,
    FORGET_PASSWORD: 1,
    TIP: 2,
    COMMENT: 3
};

module.exports = { EMAIL_STATUS, EMAIL_TYPE };