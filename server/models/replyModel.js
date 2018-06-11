const redis = require('../db');
const {
  MESSAGE_PREFIX,
  REPLY_PREFIX,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  getAuthorIdFromMessageOrReply,
  deleteMessageOrReply,
  generateId,
  generateTimestamp,
  handleError
} = require('./modelUtils');

/*
* reply:replyid {
*      ip: [string],
*      text: [string], 
*      author: [string of a user id], 
*      parent: [string of a message id], 
*      timestamp: [string], 
*      deleted: [bool int]
*    }
*      :upvote [set of user id]
*      :downvote [set of user id]
*/

const getReplyDataFromId = async (replyId, userId) => {
  try {
    return await getMessageOrReplyDataFromId(replyId, userId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

const getReplyDataFromIds = async (replyIds, userId) => {
  try {
    return await Promise.all(
      replyIds.map(async (replyId) => await getReplyDataFromId(replyId, userId))
    );
  } catch (error) {
    handleError(error);
  }
};

const getMessageReplies = async (messageId, userId) => {
  try {
    const replyIds = await redis.lrange(
      'message:' + messageId + ':reply',
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    return await Promise.all(
      replyIds.map((replyId) =>
        getMessageOrReplyDataFromId(replyId, userId, 'reply')
      )
    );
  } catch (error) {
    handleError(error);
  }
};

const postMessageReply = async (replyText, messageId, userId, ip) => {
  try {
    const replyData = {
      ip,
      text: replyText,
      author: userId,
      parent: messageId,
      timestamp: generateTimestamp(),
      deleted: 0
    };
    const replyId = await generateId('reply');
    await redis.hmset('reply:' + replyId, replyData);
    await redis.lpush('reply', replyId);
    await redis.lpush('user:' + userId + ':reply', replyId);
    await redis.rpush('message:' + messageId + ':reply', replyId);
    return replyId;
  } catch (error) {
    handleError(error);
  }
};

const upvoteReply = async (replyId, userId) => {
  try {
    return await upvoteMessageOrReply(replyId, userId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

const downvoteReply = async (replyId, userId) => {
  try {
    return await downvoteMessageOrReply(replyId, userId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

const removeUpvoteFromReply = async (replyId, userId) => {
  try {
    return await removeUpvoteFromMessageOrReply(replyId, userId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

const removeDownvoteFromReply = async (replyId, userId) => {
  try {
    return await removeDownvoteFromMessageOrReply(replyId, userId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

const getIdOfParentMessage = async (replyId) => {
  try {
    return await redis.hget('reply:' + replyId, 'parent');
  } catch (error) {
    handleError(error);
  }
};

const getReplyAuthorId = async (replyId) => {
  try {
    return await getAuthorIdFromMessageOrReply(replyId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

const deleteReply = async (replyId) => {
  try {
    return await deleteMessageOrReply(replyId, 'reply');
  } catch (error) {
    handleError(error);
  }
};

module.exports = {
  postMessageReply,
  getMessageReplies,
  getReplyDataFromId,
  getReplyDataFromIds,
  getIdOfParentMessage,
  upvoteReply,
  downvoteReply,
  removeUpvoteFromReply,
  removeDownvoteFromReply,
  getReplyAuthorId,
  deleteReply
};
