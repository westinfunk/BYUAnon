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
    return await redis.hgetall('user:' + userId);
  } catch (error) {
    handleError(error);
  }
};

const checkIfUserExists = async (userId) => {
  try {
    return await redis.exists('user:' + userId);
  } catch (error) {
    handleError(error);
  }
};

const _generateUserId = async () => {
  let generatedId = await generateId('user');
  let userExistsAlready = await checkIfUserExists(generatedId);
  while (userExistsAlready) {
    /*
    * Failsafe to make sure a device isn't assigned the id
    * of an already-existing user
    * Ideally userExistsAlready will never be true
    */
    generatedId = await generateId('user');
    userExistsAlready = await checkIfUserExists(generatedId);
  }
  return generatedId;
};

const addNewUser = async (ip, userId) => {
  try {
    userId = userId || (await _generateUserId());
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
  checkIfUserExists,
  getIdsOfMessagesUserRepliedTo
};
