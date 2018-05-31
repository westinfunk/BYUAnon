const redis = require('../db');
const {
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  generateTimestamp,
  getIdOfParentMessage,
  generateId
} = require('./modelUtils');
const { handleError } = require('../utils');

/*
  user:userid {
              ip: [string],
              score: [int]
              timestamp: [string],
              }
            :message [list of message ids]
            :reply [list of reply ids]
            :repliedto[maybe do this, ordered set of messages user replied to]
*/

const getUser = async (userId) => {
  try {
    return redis.hgetall('user:' + userId);
  } catch (erorr) {
    handleError(error);
  }
};

const addNewUser = async (ip) => {
  try {
    const userId = await generateId('user');
    const timestamp = generateTimestamp();
    const userStorageObject = {
      timestamp,
      ip,
      score: 100
    };
    await redis.hmset('user:' + userId, userStorageObject);
    await redis.lpush('user', userId);
    return userId;
  } catch (error) {
    handleError(error);
  }
};

const getUserMessageIds = async (userId) => {
  try {
    return await redis.lrange(
      'user:' + userId + ':message',
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
  } catch (error) {
    handleError(error);
  }
};

// const getUserMessages = async (userId, lastMessageId) => {
//   //returns list of messages user posted
//   try {
//     const userMessageIds = await redis.lrange(
//       `user:${userId}:message`,
//       0,
//       MAX_NUMBER_OF_ELEMENTS_TO_LOAD
//     );
//     return userMessageIds.map((messageId) =>
//       getMessageOrReplyDataFromId(messageId, userId, 'message')
//     );
//   } catch (error) {
//     handleError(error);
//   }
// };

const getUserReplyIds = async (userId) => {
  try {
    const userReplyIds = await redis.lrange(
      'user:' + userId + ':reply',
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    return userReplyIds;
  } catch (error) {
    handleError(error);
  }
};

const getIdsOfMessagesUserRepliedTo = async (userId) => {
  try {
    const messageIdsUserRepliedTo = await redis.zrange(
      'user:' + userId + ':repliedto',
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    return messageIdsUserRepliedTo;
  } catch (error) {
    handleError(error);
  }
};

// const getUserReplies = async (userId, lastMessageId) => {
//   //returns list of messages user replied to
//   try {
//     const userMessageIds = await redis.lrange(
//       `user:${userId}:message`,
//       0,
//       MAX_NUMBER_OF_ELEMENTS_TO_LOAD
//     );
//     const userMessages = userMessageIds.map((messageId) =>
//       getMessageOrReplyDataFromId(messageId, userId, 'reply')
//     );
//   } catch (error) {
//     handleError(error);
//   }
// };

const getUserScore = async (userId) => {
  try {
    const score = await redis.hget('user:' + userId, 'score');
    return parseInt(score);
  } catch (error) {
    handleError(error);
  }
};

const decrementUserScore = async (userId, amount = 10) => {
  try {
    amount = Math.abs(amount) * -1;
    return modifyUserScore(userId, amount);
  } catch (error) {
    handleError(error);
  }
};

const incrementUserScore = async (userId, amount = 10) => {
  try {
    amount = Math.abs(amount);
    return modifyUserScore(userId, amount);
  } catch (error) {
    handleError(error);
  }
};

const modifyUserScore = async (userId, amount) => {
  try {
    const firstScore = await redis.hget('user:' + userId, 'score');
    await redis.hincrby('user:' + userId, 'score', amount);
    const secondScore = await redis.hget('user:' + userId, 'score');
    return await redis.hget('user:' + userId, 'score');
  } catch (error) {
    handleError(error);
  }
};

module.exports = {
  getUser,
  getUserMessageIds,
  getUserReplyIds,
  getUserScore,
  incrementUserScore,
  decrementUserScore,
  addNewUser,
  getIdsOfMessagesUserRepliedTo
};
