require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const cors = require('cors');
const connection = require('./routes/connection');
const moment = require('./routes/moment');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const video = require('./routes/video');
const user = require('./routes/user');
const badge = require('./routes/badge');
const playlist = require('./routes/playlist');
const series = require('./routes/series');
const liveStream = require('./routes/live-stream');
const userSettings = require('./routes/user-settings');
const subscriptionPay = require('./routes/subscription-pay');
const errorHandler = require('./middleware/error-handler');
const stripe = require('./routes/stripe');
const liveClassSchedule = require('./routes/liveSchedules')
const notification = require('./routes/notification');
const storage = require('./routes/storage');
const fileoperationS3 = require('./routes/fileoperationS3');
const http = require('http');
const path = require('path');
const {
  checkForNewEmails,
  destryCloudinaryResourceHandler,
} = require('./utils');
const config = require('./config/config');

const app = express();

app.use(express.json());
app.use(cors());

checkForNewEmails();

const port = process.env.PORT || 5000;
app.set('port', port);
const server = http.createServer(app);

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/admin', admin);
app.use('/api/v1/videos', video);
app.use('/api/v1/users', user);
app.use('/api/v1/badge', badge);
app.use('/api/v1/userSettings', userSettings);
app.use('/api/v1/stripe', stripe);
app.use('/api/v1/subscriptionPay', subscriptionPay);
app.use('/api/v1/notifications', notification);
app.use('/api/v1/storage', storage);
app.use('/api/v1/playlist', playlist);
app.use('/api/v1/liveClassSchedule', liveClassSchedule);
app.use('/api/v1/series', series);
app.use('/api/v1/livestream', liveStream);
app.get('/api/v1/destryCloudinaryResource', destryCloudinaryResourceHandler);
app.use('/api/v1/fileoperation', fileoperationS3);
app.use('/api/v1/connection', connection);
app.use('/api/v1/moment', moment);

// point directory/path to client folder for serving frontend files
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(errorHandler);

// catch all * for serving frontend/client files
// Keep this line near/before you app.listen
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

server.listen(port, () => {
  console.log(`=> API running on localhost:${port}`);
});
