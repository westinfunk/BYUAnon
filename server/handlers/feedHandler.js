const {
  getNewMessageIds,
  getMessageDataFromIds,
  getTopMessageIds
} = require('../models/messageModel');
const _ = require('lodash');

const _filterOutAlreadySeenMessages = (messageIds, mostRecentMessageId) => {
  return _.takeWhile(messageIds, (id) => id != mostRecentMessageId);
};

const _findVoteDirection = (userUpvoted, userDownvoted) => {
  if (!userUpvoted && !userDownvoted) {
    return null;
  } else if (userUpvoted && !userDownvoted) {
    return 'up';
  } else if (userDownvoted && !userUpvoted) {
    return 'down';
  } else {
    throw new Error('User cannot both upvote and downvote a message or reply');
  }
};

const _filterOutDeletedMessages = (messages) => {
  return _.remove(messages, (message) => message.deleted == '1');
};

const _mapMessagesToReponseObjs = (messages, userId) => {
  _filterOutDeletedMessages(messages);
  return messages.map((message) => {
    return {
      id: message.id,
      timestamp: message.timestamp,
      text: message.text,
      score: message.score,
      isAuthor: message.author == userId,
      vote: _findVoteDirection(message.userUpvoted, message.userDownvoted),
      replyCount: message.replyCount
    };
  });
};

const handleGetNewFeed = async (req, res) => {
  const { mostRecentMessageId } = req.query;
  const userId = req.get('token');
  const messageIds = await getNewMessageIds();
  const unseenMessageIds = _filterOutAlreadySeenMessages(
    messageIds,
    mostRecentMessageId
  );
  const messageData = await getMessageDataFromIds(unseenMessageIds, userId);
  const responseData = _mapMessagesToReponseObjs(messageData, userId);
  res.json(responseData);
};

const handleGetTopFeed = async (req, res) => {
  const { mostRecentMessageId } = req.query;
  const userId = req.get('token');
  const messageIds = await getTopMessageIds();
  const unseenMessageIds = _filterOutAlreadySeenMessages(
    messageIds,
    mostRecentMessageId
  );
  const messageData = await getMessageDataFromIds(unseenMessageIds, userId);
  const responseData = _mapMessagesToReponseObjs(messageData, userId);
  res.json(responseData);
};

module.exports = {
  handleGetNewFeed,
  handleGetTopFeed
};
