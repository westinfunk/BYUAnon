const redis = require('../db');
const { handleError } = require('../utils');
const {
  MESSAGE_PREFIX,
  DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD,
  MAX_NUMBER_OF_ELEMENTS_TO_LOAD,
  getMessageOrReplyDataFromId

} = require('./modelUtils');


/*
* message:id [hash]
*           {
*             ip: [string],
*             text: [string],
*             author: [string],
*             parent: [string],
*             timestamp: [string],
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

const getMostRecentMessageIds = async () => {
  try {
    return await redis.lrange('message', 0, DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD);
  } catch (error) {
    handleError(error);
  }
};

const getMessageDataFromIds = async (ids, userId) => {
  try {
    return await ids.map(id => {
      return await getMessageOrReplyDataFromId(id, userId, 'message');
    })
  } catch (error) {
    handleError(error);
  }
}

const getOlderMessageIds = async () => {
  try {
    return await redis.lrange('message:', 0, MAX_NUMBER_OF_ELEMENTS_TO_LOAD);
  } catch(error) {
    handleError(error);
  }
}

const get