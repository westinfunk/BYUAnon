const redis = require('../db');
const { handleError } = require('../utils');
const {
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  generateTimestamp,
  generateId
} = require('./modelUtils');

/*
* message:id [hash]
*           {
*             ip: [string],
*             text: [string],
*             author: [string],
*             timestamp: [string],
*             deleted: [bool]
*           }
*
* message:reply: [list]
* message:upvote: [set]
* message:downvote: [set]
*
* message: [list]
* all messages posted pushed to left side of this list
*
* message:top [ordered set]
* all messages also added to this set, ordered by score
*
*
*/

const postMessage = async (messageText, userId, ip) => {
  try {
    const timestamp = generateTimestamp();
    const messageData = {
      ip,
      timestamp,
      text: messageText,
      author: userId,
      deleted: 0
    };
    const messageId = await generateId('message');
    await redis.lpush('message', messageId);
    await redis.hmset('message:' + messageId, messageData);
    await redis.zadd('message:top', 0, messageId);
    await redis.lpush('user:' + userId + ':message', messageId);
    return messageId;
  } catch (error) {
    handleError(error);
  }
};

const getNewMessageIds = async () => {
  try {
    return await redis.lrange('message', 0, DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD);
  } catch (error) {
    handleError(error);
  }
};

const getMessageDataFromIds = async (messageIds, userId) => {
  try {
    return await Promise.all(
      messageIds.map(
        async (messageId) => await getMessageDataFromId(messageId, userId)
      )
    );
  } catch (error) {
    handleError(error);
  }
};

const getMessageDataFromId = async (messageId, userId) => {
  try {
    return await getMessageOrReplyDataFromId(messageId, userId, 'message');
  } catch (error) {
    handleError(error);
  }
};

const getOlderMessageIds = async () => {
  try {
    return await redis.lrange('message', 0, MAX_NUMBER_OF_ELEMENTS_TO_LOAD);
  } catch (error) {
    handleError(error);
  }
};

const getTopMessageIds = async () => {
  try {
    return await redis.zrange('message:top', 0, MAX_NUMBER_OF_ELEMENTS_TO_LOAD);
  } catch (error) {
    handleError(error);
  }
};

const deleteMessage = async (messageId) => {
  try {
    return await redis.hset('message:' + messageId, 'deleted', 1);
  } catch (error) {
    handleError(error);
  }
};

const upvoteMessage = async (messageId, userId) => {
  try {
    return await redis.sadd('message:' + messageId + ':upvote', userId);
  } catch (error) {
    handleError(error);
  }
};

const downvoteMessage = async (messageId, userId) => {
  try {
    return await redis.sadd('message:' + messageId + ':downvote', userId);
  } catch (error) {
    handleError(error);
  }
};

const removeUpvoteFromMessage = async (messageId, userId) => {
  try {
    return await redis.srem('message:' + messageId, +':upvote', userId);
  } catch (error) {
    handleError(error);
  }
};

const removeDownvoteFromMessage = async (messageId, userId) => {
  try {
    return await redis.srem('message:' + messageId + ':downvote', userId);
  } catch (error) {
    handleError(error);
  }
};

const getMessageReplyIds = async (messageId) => {
  try {
    return await redis.lrange(
      'message:' + messageId + ':reply',
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
  } catch (error) {
    handleError(error);
  }
};

module.exports = {
  postMessage,
  getMessageDataFromId,
  getMessageDataFromIds,
  deleteMessage,
  upvoteMessage,
  downvoteMessage,
  removeUpvoteFromMessage,
  removeDownvoteFromMessage,
  getMessageReplyIds,
  getNewMessageIds
};
