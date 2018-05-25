const redis = require('../db');
const { handleError } = require('../utils');
const {
  MESSAGE_PREFIX,
  REPLY_PREFIX,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  generateId,
  timestamp
} = require('./modelUtils');

const getMessageReplies = async (messageId, userId) => {
  try {
    const replyIds = await redis.lrange(
      'message:' + messageId + ':reply',
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    return await replyIds.map((replyId) =>
      getMessageOrReplyDataFromId(replyId, userId, 'reply')
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
      timestamp: timestamp(),
      deleted: 0
    };
    const replyId = await generateId('reply');
    await redis.hmset('reply:' + replyId, replyData);
    await redis.rpush('message:' + messageId + ':reply');
    return 'OK';
  } catch (error) {
    handleError(error);
  }
};

const addUpvoteToReply = async (replyId, userId) => {
  try {
    await redis.sadd('reply:' + replyId + ':upvote', userId);
    return await removeUpvoteFromReply(userId);
  } catch (error) {
    handleError(error);
  }
};

const addDownvoteToReply = async (replyId, userId) => {
  try {
    await redis.sadd('reply:' + replyId + ':downvote', userId);
    return await removeUpvoteFromReply(replyId, userId);
  } catch (error) {
    handleError(error);
  }
};

const removeUpvoteFromReply = async (replyId, userId) => {
  try {
    const userHasUpvoted = await redis.sismember(
      'reply:' + replyId + ':upvote',
      userId
    );
    if (userHasUpvoted) {
      return await redis.spop('reply:' + replyId + ':upvote', userId);
    } else {
      return 'OK';
    }
  } catch (error) {
    handleError(error);
  }
};

const removeDownvoteFromReply = async (replyId, userId) => {
  try {
    const userHasUpvoted = await redis.sismember(
      'reply:' + replyId + ':downvote',
      userId
    );
    if (userHasDownvoted) {
      return await redis.spop('reply:' + replyId + ':downvote', userId);
    } else {
      return 'OK';
    }
  } catch (error) {
    handleError(error);
  }
};
