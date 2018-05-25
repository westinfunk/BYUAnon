const redis = require('../db');
const {
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  USER_PREFIX,
  MESSAGE_PREFIX,
  REPLY_PREFIX,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId
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
      timestamp: Math.floor(Date.now() / 1000)
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
      `${MESSAGE_PREFIX}${userId}:message`,
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
      `${REPLY_PREFIX}${userId}:message`,
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
