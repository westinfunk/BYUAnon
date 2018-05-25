const redis = require('../db');
const {
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  USER_PREFIX,
  MESSAGE_PREFIX,
  REPLY_PREFIX,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  timestamp
} = require('./modelUtils');

/*
  user:userid {
              ip: [string],
              score: [int]
              timestamp: [string],
              }
            :messages [list]
            :replies [list]
*/

const addNewUser = async (userId, ipAddress) => {
  try {
    const userStorageObject = {
      ip: ipAddress,
      score: 10,
      timestamp: timestamp()
    };
    await redis.hmset(`${PREFIX}${userId}`, userStorageObject);
  } catch (error) {
    console.log(error, new Date());
  }
};

const getUserMessages = async (userId, lastMessageId) => {
  //returns list of messages user posted
  try {
    const userMessageIds = await redis.lrange(
      `user:${userId}:message`,
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    return userMessageIds.map(messageId =>
      getMessageOrReplyDataFromId(messageId, userId, 'message')
    );
  } catch (error) {
    console.log(error, new Date());
  }
};

const getUserReplies = async (userId, lastMessageId) => {
  //returns list of messages user replied to
  try {
    const userMessageIds = await redis.lrange(
      `user:${userId}:message`,
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    const userMessages = userMessageIds.map(messageId =>
      getMessageOrReplyDataFromId(messageId, userId, 'reply')
    );
  } catch (error) {
    console.log(error, new Date());
  }
};

const decrementUserScore = async (userId, amount = 10) => {
  try {
    amount = Math.abs(amount) * -1;
    return modifyUserScore(userId, amount);
  } catch (error) {
    console.log(error, new Date());
  }
};

const incrementUserScore = async (userId, amount = 10) => {
  try {
    amount = Math.abs(amount);
    return modifyUserScore(userId, amount);
  } catch (error) {
    console.log(error, new Date());
  }
};

const modifyUserScore = async (userId, amount) => {
  try {
    await redis.hincrby(`user:${userId}`, 'score', amount);
    return redis.hget(`user:${userId}`, 'score', amount);
  } catch (error) {
    console.log(error, new Date());
  }
};
