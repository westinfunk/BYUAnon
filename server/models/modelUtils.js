const redis = require('../db');
const _ = require('lodash');

const DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD = 12;
const MAX_NUMBER_OF_ELEMENTS_TO_LOAD = 50;
const USER_PREFIX = 'user:';
const MESSAGE_PREFIX = 'message:';
const REPLY_PREFIX = 'reply:';

const generateId = async (type) => {
  try {
    if (type !== 'user' && type !== 'message' && type !== 'reply') {
      throw new Error(
        "Type specificied in parameter must be 'user' 'message' or 'reply"
      );
    }
    let prefix = '';
    if (type == 'user') {
      prefix = 'u';
    } else if (type == 'message') {
      prefix = 'm';
    } else if (type == 'reply') {
      prefix = 'r';
    }
    await redis.incr(type + 'number');
    const number = await redis.get(type + 'number');
    return prefix + fillZeroes(number);
  } catch (error) {
    console.log(error, new Date());
  }
};

const fillZeroes = (num) => {
  const zeroesToAdd = 8 - num.toString().length;
  return new Array(zeroesToAdd).fill('0').join('') + num.toString();
};

const generateTimestamp = () => Math.floor(Date.now() / 1000);

const _findPrefix = (messageOrReply) => {
  if (messageOrReply !== 'message' && messageOrReply !== 'reply') {
    throw new Error(
      "messageOrReply param is required and must be 'message' or 'reply'"
    );
  }
  return messageOrReply == 'message' ? 'message:' : 'reply:';
};

const _checkIfExists = async (prefix, id) => {
  const exists = await redis.exists(prefix + id);
  if (!exists) {
    throw new Error('That id does not exist in database');
  }
};

const _findUpvoteCount = async (prefix, id) => {
  return parseInt(await redis.scard(prefix + id + ':upvote'));
};

const _findDownvoteCount = async (prefix, id) => {
  return parseInt(await redis.scard(prefix + id + ':downvote'));
};

const _findIfUserUpvoted = async (prefix, id, userId) => {
  if (!userId) {
    return null;
  } else {
    return await redis.sismember(prefix + id + ':upvote', userId);
  }
};

const _findIfUserDownvoted = async (prefix, id, userId) => {
  if (!userId) {
    return null;
  } else {
    return await redis.sismember(prefix + id + ':downvote', userId);
  }
};

const _getMessageData = async (prefix, id) => {
  return await redis.hgetall(prefix + id);
};

const getMessageOrReplyDataFromId = async (id, userId, messageOrReply) => {
  /* 
    pulls full message/reply data from Redis for each message/reply id
    returns an array of message/reply objects
    
    FORMAT OF RETURNED MESSAGE/REPLY OBJECTS
    {
      id: string,
      text: string,
      author: string,
      deleted: bool,
      upvoteCount: int,
      downvotecount: int,
      userUpvoted: bool,
      userDownvoted: bool,
      timestamp: string
    */
  try {
    const prefix = _findPrefix(messageOrReply);
    await _checkIfExists(prefix, id);

    let messageData = await _getMessageData(prefix, id);
    messageData.id = id;
    messageData.upvoteCount = await _findUpvoteCount(prefix, id);
    messageData.downvoteCount = await _findDownvoteCount(prefix, id);
    messageData.userUpvoted = await _findIfUserUpvoted(prefix, id, userId);
    messageData.userDownvoted = await _findIfUserDownvoted(prefix, id, userId);
    messageData.score = messageData.upvoteCount - messageData.downvoteCount;
    return messageData;
  } catch (error) {
    console.log(error, new Date());
  }
};

module.exports = {
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  generateId,
  generateTimestamp
};
