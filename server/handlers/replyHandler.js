const {
  getMessageReplies,
  postMessageReply,
  downvoteReply,
  upvoteReply,
  removeDownvoteFromReply,
  getReplyAuthorId,
  deleteReply
} = require('../models/replyModel');

const _parseVote = (reply) => {
  if (reply.userUpvoted) {
    return 'up';
  } else if (reply.userDownvoted) {
    return 'down';
  } else {
    return null;
  }
};
const _createReplyObjectsFromReplyData = (replies, userId) => {
  return replies.map((reply) => {
    return {
      id: reply.id,
      score: reply.score,
      timestamp: reply.timestamp,
      text: reply.text,
      vote: _parseVote(reply),
      isAuthor: userId == reply.author
    };
  });
};

const handleGetMessageReplies = async (req, res) => {
  //TODO: format this reply object, don't just give raw data you retard
  try {
    const messageId = req.params.id;
    const userId = req.get('token');
    console.log('oh, trying to get the replies of message', messageId, userId);
    const replies = await getMessageReplies(messageId, userId);
    const repliesResponse = _createReplyObjectsFromReplyData(replies, userId);
    console.log('replies are', replies);
    console.log('reply data is', repliesResponse);
    res.json(repliesResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error getting replies' });
  }
};

const handlePostReplyToMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.get('token');
    const ip = req.ip;
    console.log('subimtting a reply', messageId, userId);
    const text = req.body.text;
    await postMessageReply(text, messageId, userId, ip);
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error sending reply' });
  }
};

const handleUpvoteReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedDownvote = await removeDownvoteFromReply(replyId, userId);
    if (removedDownvote) {
      await incrementUserScore(authorId);
    }
    const addedUpvote = await upvoteReply(replyId, userId);
    if (addedUpvote) {
      await incrementUserScore(authorId);
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error when upvoting reply' });
  }
};

const handleDownvoteReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedUpvote = await removeUpvoteFromReply(replyId, userId);
    if (removedUpvote) {
      await decrementUserScore(authorId);
    }
    const addedDownvote = await downvoteReply(replyId, userId);
    if (addedDownvote) {
      await decrementUserScore(authorId);
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error when downvoting reply' });
  }
};

const handleRemoveDownvoteFromReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedDownvote = await removeDownvoteFromReply(replyId, userId);
    if (removedDownvote) {
      await incrementUserScore(authorId);
    }
    res.send('OK');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error removing downvote from reply' });
  }
};

const handleRemoveUpvoteFromReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedUpvote = await removeUpvoteFromReply(replyId, userId);
    if (removedUpvote) {
      await decrementUserScore(authorId);
    }
    res.send('OK');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error removing upvote from reply' });
  }
};

const handleDeleteReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = getReplyAuthorId(replyId);
    if (userId != authorId) {
      throw new Error(
        'Unable to delete a reply that you are not the author of'
      );
    }
    const deleted = deleteReply(replyId);
    res.json({ message: 'OK' });
  } catch (error) {}
  res
    .status(500)
    .json({ message: 'Server error when attempting to delete reply' });
};

module.exports = {
  handleGetMessageReplies,
  handlePostReplyToMessage,
  handleDownvoteReply,
  handleUpvoteReply,
  handleDeleteReply,
  handleRemoveUpvoteFromReply
};
