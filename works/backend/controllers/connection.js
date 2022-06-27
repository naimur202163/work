const asyncHandler = require('../middleware/async-handler');
const {
  User,
  Connections,
  UserDisplaySettings,
  VisitorBadge,
} = require('../sequelize');
const { STATUS_CODE, MESSAGES } = require('../constants');
const { addToQue } = require('../services/EmailService/addToQue');
const { Op } = require('sequelize');

exports.checkConnectionRequest = asyncHandler(async (req, res, next) => {
  try {
    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: 'yes send already ' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.sendConnectRequest = asyncHandler(async (req, res, next) => {
  try {
    // 1) validate user
    const isWarriorExists = await User.findByPk(req.body.warriorId);
    const isCollaboratorExists = await User.findByPk(req.user.id);

    if (!isWarriorExists || !isCollaboratorExists) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    if (!req.body.warriorId) {
      return next({
        message: 'warrior and collaborator ids are required',
        statusCode: 404,
      });
    }

    const isConnectionRequestExists = await Connections.findOne({
      where: {
        WarriorUserId: req.body.warriorId,
        CollaboratorUserId: req.user.id,
      },
    });

    if (isConnectionRequestExists) {
      return next({
        message: 'Connection request already exists!',
      });
    }

    const obj = {
      message: req.body.message,
      collaborate: req.body.collaborate,
      WarriorUserId: req.body.warriorId,
      CollaboratorUserId: req.user.id,
    };

    const result = await Connections.create(obj);

    // send an email to warrior user
    // pending work

    // send an notification to warrior user
    // pending work

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: result });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getAllConnectionRequest = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    const connectionRequests = await Connections.findAll({
      where: {
        WarriorUserId: user.id,
        isApproved: false,
      },

      attributes: [
        'id',
        'collaborate',
        'message',
        'CollaboratorUserId',
        'isApproved',
      ],
    });

    if (connectionRequests.length > 0) {
      const detailedRequests = async () => {
        let requests = [];

        for (let item of connectionRequests) {
          const detailedUser = await User.findOne({
            where: {
              id: item.CollaboratorUserId,
            },
            attributes: [
              'id',
              'firstname',
              'lastname',
              'username',
              'avatar',
              'userrole',
            ],
          });

          const userSettings = await UserDisplaySettings.findOne({
            where: { userId: detailedUser.id },
            attributes: [],
            include: [
              {
                model: VisitorBadge,
                attributes: ['imgPath'],
              },
            ],
          });

          detailedUser.setDataValue('userSettings', userSettings);

          requests = [
            ...requests,
            {
              id: item.id,
              collaborator: detailedUser,
              message: item.message,
              isApproved: item.isApproved,
              collaborate: item.collaborate,
            },
          ];
        }

        return requests;
      };

      res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: await detailedRequests() });
    } else {
      return next({
        message: 'No connection requests found!',
        statusCode: 404,
      });
    }
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.approveConnectionRequest = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    const isConnectionRequestExists = await Connections.findOne({
      where: {
        WarriorUserId: req.user.id,
        CollaboratorUserId: req.body.collaboratorId,
        isApproved: false,
      },
    });

    if (!isConnectionRequestExists) {
      return next({
        message: 'Connection request not found',
        statusCode: 404,
      });
    }

    await Connections.update(
      { isApproved: true },
      {
        where: {
          WarriorUserId: req.user.id,
          CollaboratorUserId: req.body.collaboratorId,
          isApproved: false,
        },
      }
    );

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: 'Connection approved' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.declinedConnectionRequest = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    const isConnectionRequestExists = await Connections.findOne({
      where: {
        WarriorUserId: req.user.id,
        CollaboratorUserId: req.body.collaboratorId,
        isApproved: false,
      },
    });

    if (!isConnectionRequestExists) {
      return next({
        message: 'Connection request not found',
        statusCode: 404,
      });
    }

    await Connections.destroy({
      where: {
        WarriorUserId: req.user.id,
        CollaboratorUserId: req.body.collaboratorId,
        isApproved: false,
      },
    });

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: 'Connection declined' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getAllConnection = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    const connections = await Connections.findAll({
      where: {
        isApproved: true,
        [Op.or]: [
          {
            WarriorUserId: user.id,
          },
          {
            CollaboratorUserId: user.id,
          },
        ],
      },

      attributes: [
        'id',
        'collaborate',
        'message',
        'WarriorUserId',
        'CollaboratorUserId',
        'isApproved',
      ],
    });

    if (!connections.length) {
      throw new Error('No friends found!');
    }

    const detailedConnection = async () => {
      let list = [];

      for (let item of connections) {
        const detailedWarrior = await User.findOne({
          where: {
            id: item.WarriorUserId,
          },
          attributes: [
            'id',
            'firstname',
            'lastname',
            'username',
            'avatar',
            'userrole',
            'createdAt',
          ],
        });

        const userSettings = await UserDisplaySettings.findOne({
          where: { userId: detailedWarrior.id },
          attributes: [],
          include: [
            {
              model: VisitorBadge,
              attributes: ['imgPath'],
            },
          ],
        });

        detailedWarrior.setDataValue('userSettings', userSettings);

        const detailedCollaborator = await User.findOne({
          where: {
            id: item.CollaboratorUserId,
          },
          attributes: [
            'id',
            'firstname',
            'lastname',
            'username',
            'avatar',
            'userrole',
            'createdAt',
          ],
        });

        const userSettings2 = await UserDisplaySettings.findOne({
          where: { userId: detailedCollaborator.id },
          attributes: [],
          include: [
            {
              model: VisitorBadge,
              attributes: ['imgPath'],
            },
          ],
        });

        detailedCollaborator.setDataValue('userSettings', userSettings2);

        list = [
          ...list,
          {
            id: item.id,
            warrior: detailedWarrior,
            collaborator: detailedCollaborator,
            message: item.message,
            isApproved: item.isApproved,
            collaborate: item.collaborate,
          },
        ];
      }

      return list;
    };

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: await detailedConnection() });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.connectionStatus = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    const isSentConnectionRequest = await Connections.findOne({
      where: {
        isApproved: false,
        WarriorUserId: req.body.warriorId,
        CollaboratorUserId: user.id,
      },
    });

    if (isSentConnectionRequest) {
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, buttonText: 'pending' });
    }

    const isFriends = await Connections.findOne({
      where: {
        isApproved: true,
        WarriorUserId: req.body.warriorId,
        CollaboratorUserId: user.id,
      },
    });

    if (isFriends) {
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, buttonText: 'message' });
    }

    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, buttonText: 'connect' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.removeConnection = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next({
        message: 'User not found!',
        statusCode: 404,
      });
    }

    const isFriends = await Connections.findOne({
      where: {
        isApproved: true,
        WarriorUserId: req.body.warriorId,
        CollaboratorUserId: req.body.collaboratorId,
      },
    });

    if (!isFriends) {
      return next({
        message: 'You are not connected.',
        statusCode: 404,
      });
    }

    await Connections.destroy({
      where: {
        id: isFriends.id,
      },
    });

    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: 'connection removed' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});
