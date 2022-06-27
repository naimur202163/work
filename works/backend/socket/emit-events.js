const AWS = require('aws-sdk');
const { OnlineUsers } = require('../sequelize');
const ENDPOINT = process.env.AWS_WEB_SOCKET_URL;
AWS.config.update({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });

const sendNotificationToOnlineUsers = async (
  data,
  webSocketAction,
  userId
) => {
  try {
    let onlineUsers = [];
    if (userId) {
      onlineUsers = await OnlineUsers.findAll({
        where: { userid: userId },
        attributes: ['socketid'],
      });
    } else {
      onlineUsers = await OnlineUsers.findAll({
        attributes: ['socketid'],
      });
    }
    data = { ...data, webSocketAction };

    for (let index = 0; index < onlineUsers.length; index++) {
      const element = onlineUsers[index];
      await sendWebSocketNotification(element.socketid, data);
    }
  } catch (err) {}
};

const sendWebSocketNotification = async (connectionId, body) => {
  try {
    await client
      .postToConnection({
        ConnectionId: connectionId,
        Data: Buffer.from(JSON.stringify(body)),
      })
      .promise();
  } catch (err) {}
};

module.exports = {
  sendNotificationToOnlineUsers,
};
