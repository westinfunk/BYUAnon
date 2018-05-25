const redis = require('../db');
const { DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD } = require('./modelUtils');

const REDIS_PREFIX = 'user:';

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
    await redis.hmset(`${REDIS_PREFIX}${userId}`, userStorageObject);
  } catch (error) {
    console.log(error, new Date());
  }
};

const getUserMessages = async (userId, lastMessageId) => {
  //returns list of messages user posted
  try {
  } catch (error) {
    console.log(error, new Date());
  }
};

const getUserMessages = async (userId, lastMessageId) => {
  //returns list of messages user replied to
  try {
  } catch (error) {
    console.log(error, new Date());
  }
};
