const redis = require('../db');
const {
  MESSAGE_PREFIX,
  REPLY_PREFIX,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId,
  generateId
} = require('./modelUtils');

const getMessageReplies = async (messageId, userId) => {
  try {
    const replyIds = await redis.lrange(
      `${MESSAGE_PREFIX}${messageId}:reply`,
      0,
      MAX_NUMBER_OF_ELEMENTS_TO_LOAD
    );
    return await replyIds.map(replyId =>
      getMessageOrReplyDataFromId(replyId, userId, 'reply')
    );
  } catch (error) {
    console.log(error, new Date());
  }
};

const postMessageReply = async (replyText, messageId, userId, ip) => {
  const replyId = await generateId('reply');
  //continue here
};
