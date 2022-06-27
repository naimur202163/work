const asyncHandler = require('../middleware/async-handler');
const request = require('request');
const {
  CreateChannelCommand,
  IvsClient,
  GetChannelCommand,
  UpdateChannelCommand,
  DeleteChannelCommand,
  GetStreamCommand,
  ListStreamsCommand,
  StopStreamCommand,
  ImportPlaybackKeyPairCommand,
  GetPlaybackKeyPairCommand,
  DeletePlaybackKeyPairCommand,
  CreateRecordingConfigurationCommand,
  GetRecordingConfigurationCommand,
  ListRecordingConfigurationsCommand,
  DeleteRecordingConfigurationCommand,
  AudioConfiguration,
} = require('@aws-sdk/client-ivs');
const { STATUS_CODE, RESPONSE_STATUS } = require('../constants');
const config = require('../config/config');
const accesskey = config.ACCESSKEY_AWS;
const secretkey = config.SECRETKEY_AWS;
const apiURL = config.AWS_BASEURL;
const arn = config.AWS_ARNKEY;

const client = new IvsClient({
  region: 'us-east-1',
  credentials: { accessKeyId: accesskey, secretAccessKey: secretkey },
});

// Channel APIs

exports.createChannel = asyncHandler(async (req, res) => {
  try {
    const createchannel = {
      authorized: true,
      latencyMode: 'NORMAL',
      name: req.body.name,
      recordingConfigurationArn: req.body.recordingConfigurationArn,
      tags: req.body.tags,
      type: req.body.type,
    };
    const command = new CreateChannelCommand(createchannel);
    const data = await client.send(command);

    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.getChannel = asyncHandler(async (req, res) => {
  try {
    const getchannel = {
      arn: req.body.arn,
    };
    const command = new GetChannelCommand(getchannel);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data.channel,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.updateChannel = asyncHandler(async (req, res) => {
  try {
    const updatechannel = {
      arn: req.body.arn,
      authorized: req.body.authorized,
      latencyMode: req.body.latencyMode,
      name: req.body.name,
      recordingConfigurationArn: req.body.recordingConfigurationArn,
      type: req.body.type,
    };
    const command = new UpdateChannelCommand(updatechannel);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data.channel,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.deleteChannel = asyncHandler(async (req, res) => {
  try {
    const deletechannel = {
      arn: req.body.arn,
    };
    const command = new DeleteChannelCommand(deletechannel);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

// Stream APIs

exports.getStream = asyncHandler(async (req, res) => {
  try {
    const getstream = {
      channelArn: req.body.channelArn,
    };
    const command = new GetStreamCommand(getstream);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data.stream,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.listStreams = asyncHandler(async (req, res) => {
  try {
    const liststreams = {
      filterBy: {
        health: req.body.health,
      },
      maxResults: req.body.maxResults,
      nextToken: req.body.nextToken,
    };
    const command = new ListStreamsCommand(liststreams);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.stopStream = asyncHandler(async (req, res) => {
  try {
    const stopstream = {
      channelArn: req.body.channelArn,
    };
    const command = new StopStreamCommand(stopstream);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: error.message,
    });
  }
});

// PlayBack Key Pair

exports.importPlayBackKeyPair = asyncHandler(async (req, res) => {
  try {
    const importplayback = {
      name: req.body.name,
      publicKeyMaterial: req.body.publicKeyMaterial,
      tags: {
        string: req.body.tags,
      },
    };
    const command = new ImportPlaybackKeyPairCommand(importplayback);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.getPlaybackKeyPair = asyncHandler(async (req, res) => {
  try {
    const getPlayBackKeyPair = {
      arn: req.body.arn,
    };
    const command = new GetPlaybackKeyPairCommand(getPlayBackKeyPair);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.deletePlaybackKeyPair = asyncHandler(async (req, res) => {
  try {
    const deleteplayback = {
      arn: req.body.arn,
    };
    const command = new DeletePlaybackKeyPairCommand(deleteplayback);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.createRecordingConfiguration = asyncHandler(async (req, res) => {
  try {
    const createrecording = {
      destinationConfiguration: {
        s3: {
          bucketName: '',
        },
      },
      name: req.body.name,
      tags: {
        string: req.body.tags,
      },
      thumbnailConfiguration: {
        recordingMode: req.body.recordingMode,
        targetIntervalSeconds: req.body.targetIntervalSeconds,
      },
    };
    const command = new CreateRecordingConfigurationCommand(createrecording);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.getRecordingConfiguration = asyncHandler(async (req, res) => {
  try {
    const getrecording = {
      arn: req.body.arn,
    };
    const command = new GetRecordingConfigurationCommand(getrecording);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.listRecordingConfiguration = asyncHandler(async (req, res) => {
  try {
    const listrecording = {
      maxResults: req.body.maxResults,
      nextToken: req.body.nextToken,
    };
    const command = new ListRecordingConfigurationsCommand(listrecording);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});

exports.deletRecordingConfiguration = asyncHandler(async (req, res) => {
  try {
    const deleterecording = {
      arn: req.body.arn,
    };
    const command = new DeleteRecordingConfigurationCommand(deleterecording);
    const data = await client.send(command);
    res.status(STATUS_CODE.SUCCESS).json({
      error: false,
      message: data,
    });
  } catch (error) {
    res.status(STATUS_CODE.ERROR).json({
      error: true,
      message: RESPONSE_STATUS.FAIL,
    });
  }
});
