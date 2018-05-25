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
      return prefix + number;
    }
  } catch (error) {
    console.log(error, new Date());
  }
};

const timestamp = () => Math.floor(Date.now() / 1000);

const getMessageOrReplyDataFromId = async (
  messageId,
  userId,
  messageOrReply
) => {
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
    if (messageOrReply !== 'message' && messageOrReply !== 'reply') {
      throw new Error(
        "messageOrReply param is required and must be 'message' or 'reply'"
      );
    }
    const prefix = messageOrReply == 'message' ? MESSAGE_PREFIX : REPLY_PREFIX;

    const messageData = await redis.get(`${prefix}${messageId}`);
    messageData.upvoteCount = await redis.scard(
      `${prefix}${messageId}:upvotes`
    );
    messageData.downvoteCount = await redis.scard(
      `${prefix}${messageId}:downvotes`
    );
    messageData.userUpvoted = await redis.ismember(
      `${prefix}${userId}:upvotes`
    );
    messageData.userDownvoted = await redis.ismember(
      `${prefix}${userId}:downvotes`
    );
    return messageData;
  } catch (error) {
    console.log(error, new Date());
  }
};

module.exports = {
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  MESSAGE_PREFIX,
  REPLY_PREFIX,
  USER_PREFIX,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  generateId,
  timestamp
};
